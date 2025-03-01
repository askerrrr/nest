import { join } from 'path';
import { Module } from '@nestjs/common';
import { RootService } from './root.service';
import { UtilsModule } from 'src/services/Utils';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { XlsxModule } from 'src/xlsx/xlsx.module';
import { RootController } from './root.controller';
import { OrderModule } from 'src/order/order.module';
import { User, UserSchema } from '../schemas/user.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ItemIdModule } from 'src/item-id/item-id.module';
import { BotApiModule } from 'src/bot-api/bot-api.module';
import { DatabaseModule } from 'src/database/database.module';
import { ItemStatusModule } from 'src/item-status/item-status.module';
import { DownloadImgModule } from 'src/download-img/download-img.module';
import { DownloadFileModule } from 'src/download-docs/download-docs.module';

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
