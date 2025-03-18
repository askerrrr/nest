import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UtilsModule } from 'src/server/services/Utils';
import { ItemStatusService } from './item-status.service';
import { ItemStatusController } from './item-status.controller';
import { User, UserSchema } from 'src/server/schemas/user.schema';
import { Item, ItemSchema } from 'src/server/schemas/item.schema';
import { DatabaseModule } from 'src/server/database/database.module';

@Module({
  controllers: [ItemStatusController],
  providers: [ItemStatusService],
  imports: [
    UtilsModule,
    DatabaseModule,
    MongooseModule.forRoot('mongodb://localhost/database'),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Item.name,
        schema: ItemSchema,
      },
    ]),
  ],
})
export class ItemStatusModule {}
