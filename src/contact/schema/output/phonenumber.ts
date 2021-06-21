import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PhoneNumber {
  @Field(() => Int)
  id: number;

  @Field()
  number: string;
}
