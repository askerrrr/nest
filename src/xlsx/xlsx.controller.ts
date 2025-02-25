import { Response } from 'express';
import { XlsxService } from './xlsx.service';
import { Get, Param, Controller, Res } from '@nestjs/common';
import { join } from 'path';

@Controller('xlsx')
export class XlsxController {
  constructor(private readonly xlsxService: XlsxService) {}

  @Get(':userId/:orderId')
  async getXLSXFIle(@Param() param, @Res() res: Response) {
    return res.sendFile(
      join(__dirname, '..', '..', 'client', 'html', 'sheet.html'),
    );
  }

  @Get('/api/:userId/:orderId')
  async getXLSXData(param) {
    return this.xlsxService.getXLSXData(param.userId, param.orderId);
  }
}
