import { Module } from '@nestjs/common';
import { BotApiService } from './bot-api.service';
import { BotApiController } from './bot-api.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  controllers: [BotApiController],
  providers: [BotApiService],
  imports: [
    MongooseModule.forRoot('mongodb://localhost/database'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class BotApiModule {}
