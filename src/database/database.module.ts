import { Global, Module } from '@nestjs/common';
import { UserCollectionService } from './user.collection.service';
import { ItemCollectionService } from './item-status.collection.service';

@Global()
@Module({
  exports: [UserCollectionService, ItemCollectionService],
  providers: [UserCollectionService, ItemCollectionService],
})
export class DatabaseModule {}
