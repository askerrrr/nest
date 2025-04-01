import * as JSZip from 'jszip';
import * as Exceljs from 'exceljs';
import { Injectable } from '@nestjs/common';
import { CombinedData, XlsxData } from './xlsx.dto';
import { access, readFile, constants } from 'fs/promises';
import { UserCollectionService } from 'src/server/database/user-collection/user.collection.service';
import { ItemCollectionService } from 'src/server/database/item-collection/item-status.collection.service';

@Injectable()
export class XlsxService {
  constructor(
    private readonly itemCollection: ItemCollectionService,
    private readonly userCollection: UserCollectionService,
  ) {}

  async getImageFromXLSX(filePath: string): Promise<string[]> {
    var fileData = await readFile(filePath);

    var zip = await JSZip.loadAsync(fileData);

    var mediaFiles = Object.keys(zip.files).filter((fileName) =>
      fileName.startsWith('xl/media/'),
    );

    if (mediaFiles.length == 0) {
      return [];
    }

    var buffer = await Promise.all(
      mediaFiles.map(
        async (fileName) => await zip.files[fileName].async('nodebuffer'),
      ),
    );

    var base64 = buffer.map((buf) => Buffer.from(buf).toString('base64'));

    return base64;
  }

  async getColumnData(
    columnNumber: number,
    ws: any,
    skipFirst: boolean = true,
  ): Promise<string[]> {
    var data: string[] = [];

    var column = ws.getColumn(columnNumber);

    column.eachCell((e) => data.push(e.text ?? ''));

    return skipFirst ? data.slice(1) : data.slice(0, 1);
  }

  async getDataFromXLSX(filePath: string): Promise<XlsxData> {
    var wb = new Exceljs.Workbook();

    await wb.xlsx.readFile(filePath);

    var ws: any = wb.getWorksheet('Лист1');

    if (!ws) {
      throw new Error('WorksSheet "Лист1" not found');
    }

    var url = await this.getColumnData(2, ws);
    var qty = await this.getColumnData(3, ws);
    var size = await this.getColumnData(4, ws);
    var itemPrice = await this.getColumnData(5, ws);
    var totalSum = await this.getColumnData(7, ws, false);

    return { url, qty, size, totalSum, itemPrice };
  }

  async combineData(userId: string, orderId: string): Promise<CombinedData[]> {
    var filePath = await this.userCollection.findFilePath(userId, orderId);

    var xlsxData = await this.getDataFromXLSX(filePath);

    var imageData = await this.getImageFromXLSX(filePath);
    var items = await this.itemCollection.getItems(userId, orderId);
    var itemId = await this.itemCollection.getItemId(userId, orderId);

    var data: CombinedData[] = [];

    for (let i = 0; i < xlsxData.url.length; i++) {
      data.push({
        id: itemId[i],
        url: xlsxData.url[i],
        qty: xlsxData.qty[i],
        size: xlsxData.size[i],
        img: imageData[i],
        item: items[i],
        itemPrice: xlsxData.itemPrice[i],
        totalSum: xlsxData.totalSum[i],
      });
    }

    return data;
  }

  async checkFileExists(userId: string, orderId: string): Promise<boolean> {
    var filePath = await this.userCollection.findFilePath(userId, orderId);

    var fileIsExists = await access(filePath, constants.F_OK)
      .then(() => true)
      .catch(() => false);

    return fileIsExists;
  }
}
