import { Inject, Injectable } from '@nestjs/common';
import { ContactEntity } from '../contact/entity/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    @Inject('CONTACT_REPOSITORY')
    private contactRepository: Repository<ContactEntity>,
  ) {}

  public async uploadFile(file: Express.Multer.File, userId): Promise<Boolean> {
    try {
      const contact = await this.contactRepository.findOne(userId);

      if (!contact) return false;

      contact.file = file.buffer;
      contact.filename = file.originalname;
      contact.mimetype = file.mimetype;

      const saved = await this.contactRepository.save(contact);

      return true;
    } catch (error) {
      console.error('uploadFile', error);
      return false;
    }
  }

  public async downloadProfile(userId): Promise<ContactEntity> {
    const contact = await this.contactRepository.findOne(userId);

    if (contact && contact.file) return Promise.resolve(contact);
    else return Promise.reject();
  }
}
