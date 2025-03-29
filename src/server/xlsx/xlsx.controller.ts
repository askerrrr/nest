import { join } from 'path';
import { Response } from 'express';
import { Get, Controller, Res, Param, UseGuards } from '@nestjs/common';

import { XlsxService } from './xlsx.service';
import { AuthGuard } from '../auth/auth.guard';
import { Params, FIleIsExists, CombinedData } from './xlsx.dto';
import { UserCollectionService } from 'src/server/database/user.collection.service';
import { ItemCollectionService } from 'src/server/database/item-status.collection.service';

@Controller('xlsx')
export class XlsxController {
  constructor(
    private readonly xlsxService: XlsxService,
    private readonly itemCollection: ItemCollectionService,
    private readonly userCollection: UserCollectionService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/:userId/:orderId')
  async getXLSXFIle(@Res() res: Response) {
    res.sendFile(join(__dirname, '../../src/client/html/sheet.html'));
  }

  @UseGuards(AuthGuard)
  @Get('/api/:userId/:orderId')
  async getXLSXData(@Param() param: Params): Promise<object> {
    var { userId, orderId } = param;

    var filePath = await this.userCollection.findFilePath(userId, orderId);
    //var filePath = 'C:\\Users\\Adm\\Desktop\\510709571140.xlsx';

    var items: string[] = await this.itemCollection.getItems(userId, orderId);
    var itemId: string[] = await this.itemCollection.getItemId(userId, orderId);
    var imgData: object = await this.xlsxService.getImageFromXLSX(filePath);
    var xlsxData: object = await this.xlsxService.getDataFromXLSX(filePath);

    var combinedData: CombinedData[] = await this.xlsxService.combineData(
      xlsxData,
      imgData,
      items,
      itemId,
    );

    return combinedData;
  }

  @UseGuards(AuthGuard)
  @Get('check/:userId/:orderId')
  async checkFileExists(@Param() param: Params): Promise<FIleIsExists> {
    var { userId, orderId } = param;

    var filePath: string = await this.userCollection.findFilePath(
      userId,
      orderId,
    );

    //var filePath = 'C:\\Users\\Adm\\Desktop\\510709571140.xlsx';

    var fileIsExists: boolean =
      await this.xlsxService.checkFileExists(filePath);

    return { fileIsExists };
  }
}
