import { join } from 'path';
import { Response } from 'express';
import { Get, Controller, Res, Param, UseGuards } from '@nestjs/common';

import { ParamDto } from '../dto/app.dtos';
import { XlsxService } from './xlsx.service';
import { AuthGuard } from '../auth/auth.guard';
import { FIleIsExists, CombinedData } from './xlsx.dto';

@Controller('xlsx')
export class XlsxController {
  constructor(private readonly xlsxService: XlsxService) {}

  @UseGuards(AuthGuard)
  @Get('/:userId/:orderId')
  async getXLSXFIle(@Res() res: Response): Promise<void> {
    return res.sendFile(join(__dirname, '../../src/client/html/sheet.html'));
  }

  @UseGuards(AuthGuard)
  @Get('/api/:userId/:orderId')
  async getXLSXData(@Param() param: ParamDto): Promise<CombinedData[]> {
    var { userId, orderId } = param;

    var filePath = await this.xlsxService.getFilePath(userId, orderId);
    //var filePath = 'C:\\Users\\Adm\\Desktop\\510709571140.xlsx';

    var items = await this.xlsxService.getItems(userId, orderId);
    var itemId = await this.xlsxService.getItemId(userId, orderId);
    var imgData = await this.xlsxService.getImageFromXLSX(filePath);
    var xlsxData = await this.xlsxService.getDataFromXLSX(filePath);

    var combinedData = await this.xlsxService.combineData(
      xlsxData,
      imgData,
      items,
      itemId,
    );

    return combinedData;
  }

  @UseGuards(AuthGuard)
  @Get('check/:userId/:orderId')
  async checkFileExists(@Param() param: ParamDto): Promise<FIleIsExists> {
    var { userId, orderId } = param;

    var filePath: string = await this.xlsxService.getFilePath(userId, orderId);

    //var filePath = 'C:\\Users\\Adm\\Desktop\\510709571140.xlsx';

    var fileIsExists = await this.xlsxService.checkFileExists(filePath);

    return { fileIsExists };
  }
}
