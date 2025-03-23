import { Module } from '@nestjs/common';

import { XlsxModule } from '../xlsx/xlsx.module';
import { BotApiService } from './bot-api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BotApiController } from './bot-api.controller';
import { UtilsModule } from 'src/server/services/Utils';
import { User, UserSchema } from 'src/server/schemas/user.schema';
import { DatabaseModule } from 'src/server/database/database.module';
import { XlsxService } from '../xlsx/xlsx.service';

@Module({
  controllers: [BotApiController],
  providers: [BotApiService, XlsxService],
  imports: [
    XlsxModule,
    UtilsModule,
    DatabaseModule,
    MongooseModule.forRoot('mongodb://localhost/database'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class BotApiModule {}
