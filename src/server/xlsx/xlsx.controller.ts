import { join } from 'path';
import { Response } from 'express';
import { Get, Controller, Res, Param } from '@nestjs/common';

import { ParamDto } from './xlsx.dto';
import { XlsxService } from './xlsx.service';
import { UserCollectionService } from 'src/server/database/user.collection.service';
import { ItemCollectionService } from 'src/server/database/item-status.collection.service';

@Controller('xlsx')
export class XlsxController {
  constructor(
    private readonly xlsxService: XlsxService,
    private readonly itemCollection: ItemCollectionService,
    private readonly userCollection: UserCollectionService,
  ) {}

  @Get('/:userId/:orderId')
  async getXLSXFIle(@Res() res: Response) {
    res.sendFile(join(__dirname, '../../src/client/html/sheet.html'));
  }

  @Get('/api/:userId/:orderId')
  async getXLSXData(@Param() param: ParamDto): Promise<object> {
    var userId = param.userId;
    var orderId = param.orderId;

    var filePath = await this.userCollection.findFilePath(userId, orderId);
    //var filePath = 'C:\\Users\\Adm\\Desktop\\510709571140.xlsx';

    var items: string[] = await this.itemCollection.getItems(userId, orderId);
    var itemId: string[] = await this.itemCollection.getItemId(userId, orderId);
    var imgData: object = await this.xlsxService.getImageFromXLSX(filePath);
    var xlsxData: object = await this.xlsxService.getDataFromXLSX(filePath);

    var combinedData: object = this.xlsxService.combineData(
      xlsxData,
      imgData,
      items,
      itemId,
    );

    return combinedData;
  }

  @Get('check/:userId/:orderId')
  async checkFileExists(@Param() param: ParamDto): Promise<object> {
    var filePath = await this.userCollection.findFilePath(
      param.userId,
      param.orderId,
    );

    //var filePath = 'C:\\Users\\Adm\\Desktop\\510709571140.xlsx';

    var fileIsExists: boolean =
      await this.xlsxService.checkFileExists(filePath);

    return { fileIsExists };
  }
}
