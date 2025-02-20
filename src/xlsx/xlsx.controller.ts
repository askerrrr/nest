import { XlsxService } from './xlsx.service';
import { Get, Bind, Param, Controller } from '@nestjs/common';

@Controller('xlsx')
export class XlsxController {
  constructor(private readonly xlsxService: XlsxService) {}

  @Get(':userId/:orderId')
  @Bind(Param())
  async getXLSXFIle(param) {
    return this.xlsxService.getXLSXFile(param.userId, param.orderId);
  }

  @Get('/api/:userId/:orderId')
  @Bind(Param())
  async getXLSXData(param) {
    return this.xlsxService.getXLSXData(param.userId, param.orderId);
  }
}
