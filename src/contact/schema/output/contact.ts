import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsArray, IsOptional } from 'class-validator';
import { ContactEntity } from '../../entity/contact.entity';
import { PhoneNumber } from './phonenumber';

@ObjectType()
export class Contact {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  @IsOptional()
  nickName?: string;

  @Field(() => [PhoneNumber])
  @IsArray()
  phoneNumbers: PhoneNumber[];

  @Field({ nullable: true })
  @IsOptional()
  address?: string;

  /**
   *
   */
  constructor(entity: ContactEntity) {
    this.id = entity.id;
    this.firstName = entity.firstname;
    this.lastName = entity.lastname;
    this.nickName = entity.nickname;
    this.phoneNumbers = (entity.phonenumbers || []).map((pn) => ({
      id: pn.id,
      number: pn.number,
    }));
    this.address = entity.address;
  }
}
