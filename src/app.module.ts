import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ContactModule } from './contact/contact.module';
import { FileModule } from './file/file.module';

@Module({
  controllers: [],
  imports: [
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
    ContactModule,
    FileModule,
  ],
  providers: [],
})
export class AppModule {}
