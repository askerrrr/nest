import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from 'src/server/schemas/user.schema';
import { Item, ItemSchema } from 'src/server/schemas/item.schema';
import { UserCollectionService } from './user.collection.service';
import { ItemCollectionService } from './item-status.collection.service';
import { AdminCollectionService } from './admin.service';
import { Admin, AdminSchema } from '../schemas/admin.schema';

@Global()
@Module({
  exports: [UserCollectionService, ItemCollectionService],
  providers: [UserCollectionService, ItemCollectionService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
})
export class DatabaseModule {}
//   { name: Admin.name, schema: AdminSchema },
