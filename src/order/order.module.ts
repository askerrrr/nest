import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard } from 'src/auth/auth.guard';
import { OrderService } from './order.service';
import { UtilsModule } from 'src/services/Utils';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { User, UserSchema } from 'src/schemas/user.schema';
import { DatabaseModule } from 'src/database/database.module';

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
