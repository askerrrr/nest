import { Module } from '@nestjs/common';

import { XlsxService } from './xlsx.service';
import { AuthModule } from '../auth/auth.module';
import { XlsxController } from './xlsx.controller';
@Module({
  providers: [XlsxService],
  controllers: [XlsxController],
  imports: [AuthModule],
})
export class XlsxModule {}
