import { join } from 'path';
import { Response } from 'express';
import { Get, Controller, Res, Param, UseGuards } from '@nestjs/common';

import { XlsxService } from './xlsx.service';
import { AuthGuard } from '../auth/auth.guard';

import { ParamDto } from '../dto/app.dtos';
import { FIleIsExists } from './dto/fileIsExists-dto';
import { CombinedData } from './dto/combinedData-dto';

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

    //var filePath = 'C:\\Users\\Adm\\Desktop\\510709571140.xlsx';

    var combinedData = await this.xlsxService.combineData(userId, orderId);

    return combinedData;
  }

  @UseGuards(AuthGuard)
  @Get('/check/:userId/:orderId')
  async checkFileExists(@Param() param: ParamDto): Promise<FIleIsExists> {
    var { userId, orderId } = param;

    //var filePath = 'C:\\Users\\Adm\\Desktop\\510709571140.xlsx';

    var fileIsExists = await this.xlsxService.checkFileExists(userId, orderId);

    return { fileIsExists };
  }
}
