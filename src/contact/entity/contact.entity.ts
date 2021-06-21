import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PhoneNumberEntity } from './phonenumber.entity';

@Entity('contact')
export class ContactEntity extends BaseEntity {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: true })
  nickname: string;

  @OneToMany(() => PhoneNumberEntity, (phonenumber) => phonenumber.contact)
  phonenumbers: PhoneNumberEntity[];

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'bytea', nullable: true })
  file: Buffer;

  @Column({ nullable: true })
  filename: string;

  @Column({ nullable: true })
  mimetype: string;
}
