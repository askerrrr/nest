import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { UtilsModule } from 'src/server/services/Utils';
import { ItemStatusService } from './item-status.service';
import { User, UserSchema } from 'src/server/schemas/user.schema';
import { Item, ItemSchema } from 'src/server/schemas/item.schema';
import { DatabaseModule } from 'src/server/database/database.module';
import { DeliveryStatusController } from './delivery-status.controller';
import { PurchasedStatusController } from './purchased-status.controller';

@Module({
  controllers: [DeliveryStatusController, PurchasedStatusController],
  providers: [ItemStatusService],
  imports: [
    AuthModule,
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
