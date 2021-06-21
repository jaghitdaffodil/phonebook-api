import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateContactInput {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;

  @Field()
  @IsOptional()
  firstName?: string;

  @Field()
  @IsOptional()
  lastName?: string;

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
