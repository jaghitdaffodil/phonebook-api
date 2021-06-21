import { Connection } from 'typeorm';
import { ContactEntity } from '../contact/entity/contact.entity';

export const FileProviders = [
  {
    provide: 'CONTACT_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(ContactEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
