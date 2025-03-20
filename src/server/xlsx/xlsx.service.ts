import * as JSZip from 'jszip';
import * as Exceljs from 'exceljs';
import { Injectable } from '@nestjs/common';
import { access, readFile, constants } from 'fs/promises';

@Injectable()
export class XlsxService {
  constructor() {}

  async getImageFromXLSX(filePath): Promise<object> {
    var fileData = await readFile(filePath);

    var zip = await JSZip.loadAsync(fileData);

    var mediaFiles = Object.keys(zip.files).filter((fileName) =>
      fileName.startsWith('xl/media/'),
    );

    if (mediaFiles.length == 0) {
      return {};
    }

    var buffer = await Promise.all(
      mediaFiles.map(
        async (fileName) => await zip.files[fileName].async('nodebuffer'),
      ),
    );

    var base64: object = buffer.map((buf) =>
      Buffer.from(buf).toString('base64'),
    );

    return base64;
  }

  async getDataFromXLSX(filePath): Promise<object> {
    var wb = new Exceljs.Workbook();

    await wb.xlsx.readFile(filePath);

    var ws: any = wb.getWorksheet('Лист1');

    var url: string[] = [];
    var qty: string[] = [];
    var size: string[] = [];
    var totalSum: string[] = [];
    var itemPrice: string[] = [];

    ws.getColumn(2).eachCell((b) => url.push(b.text || ''));
    ws.getColumn(3).eachCell((c) => qty.push(c.text || ''));
    ws.getColumn(4).eachCell((d) => size.push(d.text || ''));
    ws.getColumn(5).eachCell((e) => itemPrice.push(e.text || 0));
    ws.getColumn(7).eachCell((g) => totalSum.push(g.text || 0));

    url.shift();
    qty.shift();
    size.shift();
    totalSum = totalSum.slice(0, 1);
    itemPrice.shift();

    var xlsxData: object = [url, qty, size, totalSum, itemPrice];

    return xlsxData;
  }

  async combineData(data, image, items, itemId): Promise<object> {
    var [url, qty, size, totalSum, itemPrice] = data;
    var fileData: object[] = [];

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

  async checkFileExists(filePath): Promise<boolean> {
    var fileIsExists: boolean = await access(filePath, constants.F_OK)
      .then(() => true)
      .catch(() => false);

    return fileIsExists;
  }
}
