import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ContactProviders } from './contact.provider';
import { ContactResolver } from './contact.resolver';
import { ContactService } from './contact.service';

@Module({
  controllers: [],
  imports: [DatabaseModule],
  providers: [ContactResolver, ContactService, ...ContactProviders],
})
export class ContactModule {}
