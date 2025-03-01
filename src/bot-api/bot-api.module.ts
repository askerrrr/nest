import { Module } from '@nestjs/common';
import { UtilsModule } from 'src/services/Utils';
import { BotApiService } from './bot-api.service';
import { BotApiController } from './bot-api.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { DatabaseModule } from 'src/database/database.module';

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
