import { join } from 'path';
import { Module } from '@nestjs/common';
import { RootService } from './root.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RootController } from './root.controller';
import { OrderModule } from 'src/order/order.module';
import { ItemStatusModule } from 'src/item-status/item-status.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  controllers: [RootController],
  providers: [RootService],
  imports: [
    OrderModule,
    ItemStatusModule,
    ItemStatusModule,
    ServeStaticModule.forRoot({
      serveRoot: '/',
      rootPath: join(__dirname, '..', '..', 'client', 'html'),
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'database',
    }),
  ],
})
export class RootModule {}
