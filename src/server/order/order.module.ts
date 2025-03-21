import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderService } from './order.service';
import { AuthModule } from '../auth/auth.module';
import { OrderController } from './order.controller';
import { UtilsModule } from 'src/server/services/Utils';
import { User, UserSchema } from 'src/server/schemas/user.schema';
import { DatabaseModule } from 'src/server/database/database.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService], //{ provide: APP_GUARD, useClass: AuthGuard }
  imports: [
    AuthModule,
    UtilsModule,
    DatabaseModule,
    MongooseModule.forRoot('mongodb://localhost/database'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class OrderModule {}
