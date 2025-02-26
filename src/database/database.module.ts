import { Global, Module } from '@nestjs/common';
import { UserCollectionService } from './user.collection.service';
import { ItemStatusCollectionService } from './item-status.collection.service';

@Global()
@Module({
  providers: [UserCollectionService, ItemStatusCollectionService],
  exports: [UserCollectionService, ItemStatusCollectionService],
})
export class DatabaseModule {}
