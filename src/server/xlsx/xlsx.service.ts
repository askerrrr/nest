import * as JSZip from 'jszip';
import * as Exceljs from 'exceljs';
import { Injectable } from '@nestjs/common';
import { access, readFile, constants } from 'fs/promises';
import { CombinedData, XlsxData } from './xlsx.dto';

@Injectable()
export class XlsxService {
  constructor() {}

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

    var base64: string[] = buffer.map((buf) =>
      Buffer.from(buf).toString('base64'),
    );

    return base64;
  }

  async getColumnData(columnNumber, ws, skipFirst = true): Promise<string[]> {
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

  async combineData(xlsxData, image, items, itemId): Promise<CombinedData[]> {
    var { url, qty, size, totalSum, itemPrice }: XlsxData = xlsxData;

    var fileData: CombinedData[] = [];

    for (let i = 0; i < url.length; i++) {
      fileData.push({
        id: itemId[i],
        url: url[i],
        qty: qty[i],
        size: size[i],
        img: image[i],
        item: items[i],
        itemPrice: itemPrice[i],
        totalSum: totalSum[i],
      });
    }

    return fileData;
  }

  async checkFileExists(filePath: string): Promise<boolean> {
    var fileIsExists: boolean = await access(filePath, constants.F_OK)
      .then(() => true)
      .catch(() => false);

    return fileIsExists;
  }
}
