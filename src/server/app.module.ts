import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { XlsxModule } from './xlsx/xlsx.module';
import { RootModule } from './root/root.module';
import { OrderModule } from './order/order.module';
import { ItemIdModule } from './item-id/item-id.module';
import { BotApiModule } from './bot-api/bot-api.module';
import { OpenImgModule } from './open-img/open-img.module';
import { ItemStatusModule } from './item-status/item-status.module';
import { OrderStatusModule } from './order-status/order-status.module';
import { DownloadFileModule } from './download-docs/download-docs.module';

@Module({
  imports: [
    XlsxModule,
    RootModule,
    OrderModule,
    BotApiModule,
    ItemIdModule,
    OpenImgModule,
    ItemStatusModule,
    OrderStatusModule,
    DownloadFileModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
    }),

    MongooseModule.forRoot('mongodb://127.0.0.1:27017/users', {
      connectionName: 'main',
    }),

    ServeStaticModule.forRoot({
      serveRoot: '/',
      rootPath: join(__dirname, '../src/client'),
    }),
  ],
})
export class AppModule {}
