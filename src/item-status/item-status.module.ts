import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemStatusService } from './item-status.service';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Item, ItemSchema } from 'src/schemas/item.schema';
import { DatabaseModule } from 'src/database/database.module';
import { ItemStatusController } from './item-status.controller';

@Module({
  controllers: [ItemStatusController],
  providers: [ItemStatusService],
  imports: [
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
