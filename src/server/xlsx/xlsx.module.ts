import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { XlsxService } from './xlsx.service';
import { XlsxController } from './xlsx.controller';
import { User, UserSchema } from 'src/server/schemas/user.schema';
import { Item, ItemSchema } from 'src/server/schemas/item.schema';
import { DatabaseModule } from 'src/server/database/database.module';

@Module({
  providers: [XlsxService],
  controllers: [XlsxController],
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
export class XlsxModule {}
