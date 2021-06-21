import { Connection } from 'typeorm';
import { ContactEntity } from './entity/contact.entity';
import { PhoneNumberEntity } from './entity/phonenumber.entity';

export const ContactProviders = [
  {
    provide: 'CONTACT_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(ContactEntity),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'PHONE_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(PhoneNumberEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
