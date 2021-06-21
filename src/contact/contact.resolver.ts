import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ContactService } from './contact.service';
import { GetContactArgs } from './schema/input/get-contact.args';
import { GetContactsArgs } from './schema/input/get-contacts.args';
import { CreateContactInput } from './schema/input/create-contact.input';
import { DeleteContactInput } from './schema/input/delete-contact.input';
import { UpdateContactInput } from './schema/input/update-contact.input';
import { Contact } from './schema/output/contact';
import { Contacts } from './schema/output/contacts';

@Resolver(() => Contact)
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}

  @Query(() => Contact, { name: 'contact' })
  async getContact(@Args() getContactArgs: GetContactArgs): Promise<Contact> {
    const contactEntity = await this.contactService.getContact(getContactArgs);
    return new Contact(contactEntity);
  }

  @Query(() => Contacts, { name: 'contacts' })
  async getContacts(
    @Args() getContactsArgs: GetContactsArgs,
  ): Promise<Contacts> {
    return await this.contactService.getContacts(getContactsArgs);
  }

  @Mutation(() => Contact)
  async createContact(
    @Args('contact') createContactData: CreateContactInput,
  ): Promise<Contact> {
    return new Contact(
      await this.contactService.createContact(createContactData),
    );
  }

  @Mutation(() => Boolean)
  updateContact(
    @Args('contact') updateContactData: UpdateContactInput,
  ): Promise<Boolean> {
    return this.contactService.updateContact(updateContactData);
  }

  @Mutation(() => Boolean)
  deleteContact(
    @Args('contact') deleteContactData: DeleteContactInput,
  ): Promise<Boolean> {
    return this.contactService.deleteContact(deleteContactData);
  }
}
