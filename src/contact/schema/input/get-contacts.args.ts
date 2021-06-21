import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@ArgsType()
export class GetContactsArgs {
  @Field(() => Int)
  @IsNotEmpty()
  limit: number;

  @Field(() => Int)
  @IsNotEmpty()
  offset: number;

  @Field()
  @IsNotEmpty()
  sortBy: string;

  @Field()
  @IsNotEmpty()
  order: string;

  @Field({ nullable: true })
  @IsOptional()
  search?: string;
}
