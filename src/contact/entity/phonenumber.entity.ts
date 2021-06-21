import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ContactEntity } from './contact.entity';

@Entity('phonenumber')
export class PhoneNumberEntity extends BaseEntity {
  @Column()
  number: string;

  @ManyToOne(() => ContactEntity, (contact) => contact.phonenumbers)
  contact: ContactEntity;
}
