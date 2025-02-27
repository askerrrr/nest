import { Module } from '@nestjs/common';
import { XlsxService } from './xlsx.service';
import { XlsxController } from './xlsx.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [XlsxService],
  imports: [DatabaseModule],
  controllers: [XlsxController],
})
export class XlsxModule {}
