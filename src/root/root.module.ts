import { join } from 'path';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { RootService } from './root.service';
import { AuthModule } from 'src/auth/auth.module';
import { XlsxModule } from 'src/xlsx/xlsx.module';
import { RootController } from './root.controller';
import { OrderModule } from 'src/order/order.module';
import { User, UserSchema } from '../schemas/user.schema';
import { ItemIdModule } from 'src/item-id/item-id.module';
import { BotApiModule } from 'src/bot-api/bot-api.module';
import { DatabaseModule } from 'src/database/database.module';
import { ItemStatusModule } from 'src/item-status/item-status.module';
import { DownloadImgModule } from 'src/download-img/download-img.module';
import { DownloadFileModule } from 'src/download-docs/download-docs.module';
import { OrderStatusModule } from 'src/order-status/order-status.module';

@Module({
  controllers: [RootController],
  providers: [RootService],
  imports: [
    AuthModule,
    XlsxModule,
    OrderModule,
    ItemIdModule,
    BotApiModule,
    DatabaseModule,
    OrderStatusModule,
    ItemStatusModule,
    DownloadImgModule,
    DownloadFileModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRoot('mongodb://localhost/database'),
    ServeStaticModule.forRoot({
      serveRoot: '/',
      rootPath: join(__dirname, '..', '..', 'client'),
    }),
  ],
})
export class RootModule {}
