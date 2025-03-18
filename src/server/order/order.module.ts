import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AuthGuard } from 'src/server/auth/auth.guard';
import { UtilsModule } from 'src/server/services/Utils';
import { User, UserSchema } from 'src/server/schemas/user.schema';
import { DatabaseModule } from 'src/server/database/database.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    UtilsModule,
    DatabaseModule,
    MongooseModule.forRoot('mongodb://localhost/database'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class OrderModule {}
