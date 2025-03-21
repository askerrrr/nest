import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { RootService } from './root.service';
import { RootController } from './root.controller';
import { AuthModule } from 'src/server/auth/auth.module';
import { XlsxModule } from 'src/server/xlsx/xlsx.module';
import { User, UserSchema } from '../schemas/user.schema';
import { OrderModule } from 'src/server/order/order.module';
import { ItemIdModule } from 'src/server/item-id/item-id.module';
import { BotApiModule } from 'src/server/bot-api/bot-api.module';
import { OpenImgModule } from 'src/server/open-img/open-img.module';
import { DatabaseModule } from 'src/server/database/database.module';
import { ItemStatusModule } from 'src/server/item-status/item-status.module';
import { OrderStatusModule } from 'src/server/order-status/order-status.module';
import { DownloadFileModule } from 'src/server/download-docs/download-docs.module';

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
    MongooseModule.forRoot(`${process.env.mongo_url}`),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ServeStaticModule.forRoot({
      serveRoot: '/',
      rootPath: join(__dirname, '../../src/client'),
    }),
  ],
})
export class RootModule {}
