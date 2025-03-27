import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { RootService } from './root.service';
import { RootController } from './root.controller';
import { AuthModule } from '../auth/auth.module';
import { XlsxModule } from '../xlsx/xlsx.module';
import { Item, ItemSchema } from '../schemas/item.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { OrderModule } from '../order/order.module';
import { ItemIdModule } from '../item-id/item-id.module';
import { BotApiModule } from '../bot-api/bot-api.module';
import { OpenImgModule } from '../open-img/open-img.module';
import { DatabaseModule } from '../database/database.module';
import { ItemStatusModule } from '../item-status/item-status.module';
import { OrderStatusModule } from '../order-status/order-status.module';
import { DownloadFileModule } from '../download-docs/download-docs.module';

@Module({
  controllers: [RootController],
  providers: [RootService],
  imports: [
    AuthModule,
    XlsxModule,
    OrderModule,
    ItemIdModule,
    BotApiModule,
    OpenImgModule,
    DatabaseModule,
    ItemStatusModule,
    OrderStatusModule,
    DownloadFileModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/database'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    ServeStaticModule.forRoot({
      serveRoot: '/',
      rootPath: join(__dirname, '../../src/client'),
    }),
  ],
})
export class RootModule {}
