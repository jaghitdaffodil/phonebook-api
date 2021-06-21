import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';
import { Contact } from './contact';

@ObjectType()
export class Contacts {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  offset: number;

  @Field()
  hasNext: boolean;

  @Field()
  hasPrevious: boolean;

  @Field(() => [Contact])
  @IsArray()
  data: Contact[];
}
