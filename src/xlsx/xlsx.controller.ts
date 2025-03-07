import { join } from 'path';
import { Response } from 'express';
import { Get, Controller, Res, Param } from '@nestjs/common';

import { XlsxService } from './xlsx.service';
import { UserCollectionService } from 'src/database/user.collection.service';
import { ItemCollectionService } from 'src/database/item-status.collection.service';

@Controller('xlsx')
export class XlsxController {
  constructor(
    private readonly xlsxService: XlsxService,
    private readonly itemCollection: ItemCollectionService,
    private readonly userCollection: UserCollectionService,
  ) {}

  @Get('/:userId/:orderId')
  async getXLSXFIle(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', '..', 'client', 'html', 'sheet.html'));
  }

  @Get('/api/:userId/:orderId')
  async getXLSXData(@Param() param) {
    var userId = param.userId;
    var orderId = param.orderId;

    var filePath = await this.userCollection.findFilePath(userId, orderId);
    //var filePath = 'C:\\Users\\Adm\\Desktop\\510709571140.xlsx';

    var items = await this.itemCollection.getItems(userId, orderId);
    var itemId = await this.itemCollection.getItemId(userId, orderId);
    var imgData = await this.xlsxService.getImageFromXLSX(filePath);
    var xlsxData = await this.xlsxService.getDataFromXLSX(filePath);

    var combinedData = this.xlsxService.combineData(
      xlsxData,
      imgData,
      items,
      itemId,
    );

    return combinedData;
  }

  @Get('check/:userId/:orderId')
  async checkFileExists(@Param() param) {
    var filePath = await this.userCollection.findFilePath(
      param.userId,
      param.orderId,
    );

    //var filePath = 'C:\\Users\\Adm\\Desktop\\510709571140.xlsx';

    var fileIsExists = await this.xlsxService.checkFileExists(filePath);

    return { fileIsExists };
  }
}
