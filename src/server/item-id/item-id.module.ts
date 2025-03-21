import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { ItemIdService } from './item-id.service';
import { ItemIdController } from './item-id.controller';
import { Item, ItemSchema } from 'src/server/schemas/item.schema';
import { DatabaseModule } from 'src/server/database/database.module';

@Module({
  controllers: [ItemIdController],
  providers: [ItemIdService],
  imports: [
    AuthModule,
    DatabaseModule,
    MongooseModule.forRoot('mongodb://localhost/database'),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
})
export class ItemIdModule {}
