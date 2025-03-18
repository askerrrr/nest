import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { BotApiService } from './bot-api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BotApiController } from './bot-api.controller';
import { UtilsModule } from 'src/server/services/Utils';
import { User, UserSchema } from 'src/server/schemas/user.schema';
import { DatabaseModule } from 'src/server/database/database.module';

@Module({
  controllers: [BotApiController],
  providers: [BotApiService],
  imports: [
    UtilsModule,
    DatabaseModule,
    MongooseModule.forRoot('mongodb://localhost/database'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class BotApiModule {}
