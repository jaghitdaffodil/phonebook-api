import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateContactInput {
  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field({ nullable: true })
  @IsOptional()
  nickName?: string;

  @Field(() => [String])
  @IsArray()
  phoneNumbers: string[];

  @Field({ nullable: true })
  @IsOptional()
  address?: string;
}
