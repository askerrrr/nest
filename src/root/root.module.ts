import { join } from 'path';
import { Module } from '@nestjs/common';
import { RootService } from './root.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XlsxModule } from 'src/xlsx/xlsx.module';
import { RootController } from './root.controller';
import { OrderModule } from 'src/order/order.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ItemIdModule } from 'src/item-id/item-id.module';
import { BotApiModule } from 'src/bot-api/bot-api.module';
import { ItemStatusModule } from 'src/item-status/item-status.module';
import { DownloadImgModule } from 'src/download-img/download-img.module';
import { DownloadFileModule } from 'src/download-docs/download-docs.module';


@Module({
  controllers: [RootController],
  providers: [RootService],
  imports: [
    XlsxModule,
    OrderModule,
    ItemIdModule,
    BotApiModule,
    ItemStatusModule, 
    DownloadImgModule,
    DownloadFileModule,
    ServeStaticModule.forRoot({
      serveRoot: '/',
      rootPath: join(__dirname, '..', '..', 'client', 'html'),
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      url: "",
      port: 27017,
      database: 'database',
    }),
  ],
})
export class RootModule {}
