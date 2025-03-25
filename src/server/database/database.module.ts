import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Admin, AdminSchema } from '../schemas/admin.schema';
import { User, UserSchema } from 'src/server/schemas/user.schema';
import { Item, ItemSchema } from 'src/server/schemas/item.schema';
import { UserCollectionService } from './user.collection.service';
import { AdminCollectionService } from './admin-collection.service';
import { ItemCollectionService } from './item-status.collection.service';

@Global()
@Module({
  exports: [
    MongooseModule,
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
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
})
export class DatabaseModule {}
