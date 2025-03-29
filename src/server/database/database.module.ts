import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from 'src/server/schemas/user.schema';
import { Item, ItemSchema } from 'src/server/schemas/item.schema';
import { UserCollectionService } from './user.collection.service';
import { ItemCollectionService } from './item-status.collection.service';
import { Admin, AdminSchema } from '../schemas/admin.schema';
import { AdminCollectionService } from './admin-collection.service';

@Global()
@Module({
  exports: [
    UserCollectionService,
    ItemCollectionService,
    AdminCollectionService,
  ],
  providers: [
    UserCollectionService,
    ItemCollectionService,
    AdminCollectionService,
  ],
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'main',
    ),
    MongooseModule.forFeature(
      [{ name: Item.name, schema: ItemSchema }],
      'main',
    ),
    MongooseModule.forFeature(
      [{ name: Admin.name, schema: AdminSchema }],
      'admin',
    ),
  ],
})
export class DatabaseModule {}
