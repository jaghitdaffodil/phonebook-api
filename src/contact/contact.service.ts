import { Inject, Injectable } from '@nestjs/common';
import { GetContactArgs } from './schema/input/get-contact.args';
import { GetContactsArgs } from './schema/input/get-contacts.args';
import { CreateContactInput } from './schema/input/create-contact.input';
import { DeleteContactInput } from './schema/input/delete-contact.input';
import { UpdateContactInput } from './schema/input/update-contact.input';
import { Contact } from './schema/output/contact';
import { ContactEntity } from './entity/contact.entity';
import { Repository } from 'typeorm';
import { PhoneNumberEntity } from './entity/phonenumber.entity';
import { Contacts } from './schema/output/contacts';

@Injectable()
export class ContactService {
  private contacts: Contact[] = [];

  constructor(
    @Inject('CONTACT_REPOSITORY')
    private contactRepository: Repository<ContactEntity>,
    @Inject('PHONE_REPOSITORY')
    private phoneRepository: Repository<PhoneNumberEntity>,
  ) {}

  public async createContact(
    createContactData: CreateContactInput,
  ): Promise<ContactEntity> {
    let contact: ContactEntity;
    try {
      const newContact = new ContactEntity();

      newContact.firstname = createContactData.firstName;
      newContact.lastname = createContactData.lastName;

      if (createContactData.nickName)
        newContact.nickname = createContactData.nickName;
      if (createContactData.address)
        newContact.address = createContactData.address;

      contact = await this.contactRepository.create(newContact);
      const createdContact = await this.contactRepository.save(contact);

      await Promise.all(
        createContactData.phoneNumbers.map(async (number) => {
          const newNumber = new PhoneNumberEntity();

          newNumber.number = number;
          newNumber.contact = contact;

          const phonenumber = await this.phoneRepository.create(newNumber);
          return this.phoneRepository.save(phonenumber);
        }),
      );

      return contact;
    } catch (error) {
      console.error('createContact', error);
      contact.isactive = false;
      await this.contactRepository.save(contact);
      return contact;
    }
  }

  public async updateContact(
    updateContactData: UpdateContactInput,
  ): Promise<Boolean> {
    try {
      const contact = await this.contactRepository.findOne(
        updateContactData.id,
        { relations: ['phonenumbers'], where: { isactive: true } },
      );

      // Update specific fields
      contact.firstname = updateContactData.firstName;
      contact.lastname = updateContactData.lastName;

      if (updateContactData.nickName)
        contact.nickname = updateContactData.nickName;
      if (updateContactData.address)
        contact.address = updateContactData.address;

      const updatedContact = await this.contactRepository.save(contact);

      // Mark old record as inactive // Maintain history
      let phonenumbers = await this.phoneRepository.findByIds(
        contact.phonenumbers.map((pn) => pn.id),
      );

      await Promise.all(
        phonenumbers.map(async (number) => {
          number.isactive = false;
          return this.phoneRepository.save(number);
        }),
      );

      // Adding new records for contact
      await Promise.all(
        updateContactData.phoneNumbers.map(async (number) => {
          const newNumber = new PhoneNumberEntity();

          newNumber.number = number;
          newNumber.contact = contact;

          const phonenumber = await this.phoneRepository.create(newNumber);
          return this.phoneRepository.save(phonenumber);
        }),
      );

      return true;
    } catch (error) {
      console.error('updateContact', error);
      return false;
    }
  }

  public async deleteContact(
    deleteContactData: DeleteContactInput,
  ): Promise<Boolean> {
    try {
      const contact = await this.contactRepository.findOne(
        deleteContactData.id,
        { where: { isactive: true } },
      );

      contact.isactive = false;

      const saved = await this.contactRepository.save(contact);

      return true;
    } catch (error) {
      console.error('deleteContact', error);
      return false;
    }
  }

  public async getContacts(
    getContactsArgs: GetContactsArgs,
  ): Promise<Contacts> {
    try {
      const builder = this.contactRepository
        .createQueryBuilder('contact')
        // .leftJoinAndSelect('contact.phonenumbers', 'phonenumber')
        .where('contact.isactive = true');
      // .andWhere('phonenumber.isactive = true');

      if (getContactsArgs.search) {
        builder.andWhere(
          '(contact.firstname ILIKE :search OR contact.lastname ILIKE :search OR contact.nickname ILIKE :search OR contact.address ILIKE :search)',
          {
            search: `%${getContactsArgs.search}%`,
          },
        );
      }

      if (getContactsArgs.sortBy && getContactsArgs.order) {
        const order: any = getContactsArgs.order;
        builder.orderBy(
          `contact.${getContactsArgs.sortBy}`,
          order.toUpperCase(),
        );
      }

      const limit: number = parseInt(getContactsArgs.limit as any) || 5;
      const offset: number = parseInt(getContactsArgs.offset as any) || 0;

      const total: number = await builder.getCount();

      builder.skip(offset).take(limit);

      const data = (await builder.getMany()).map(
        (contact) => new Contact(contact),
      );

      return {
        data,
        total,
        limit,
        offset,
        hasNext: offset + limit < total,
        hasPrevious: offset > 0,
      };
    } catch (error) {
      console.error('getContacts', error);
      return Promise.reject();
    }
  }

  public async getContact(
    getContactArgs: GetContactArgs,
  ): Promise<ContactEntity> {
    try {
      const builder = this.contactRepository
        .createQueryBuilder('contact')
        .leftJoinAndSelect('contact.phonenumbers', 'phonenumber')
        .where('contact.isactive')
        .andWhere('phonenumber.isactive')
        .andWhere('contact.id = :id', { id: getContactArgs.id });

      return await builder.getOne();
    } catch (error) {
      console.error('getContact', error);
      return Promise.reject();
    }
  }
}
