import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from 'src/schemas/user.schema';
import { Item, ItemSchema } from 'src/schemas/item.schema';
import { UserCollectionService } from './user.collection.service';
import { ItemCollectionService } from './item-status.collection.service';

@Global()
@Module({
  exports: [MongooseModule, UserCollectionService, ItemCollectionService],
  providers: [UserCollectionService, ItemCollectionService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Item.name, schema: ItemSchema },
    ]),
  ],
})
export class DatabaseModule {}
