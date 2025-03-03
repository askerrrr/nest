import * as JSZip from 'jszip';
import * as Exceljs from 'exceljs';
import { readFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';

@Injectable()
export class XlsxService {
  constructor() {}

  async getImageFromXLSX(filePath) {
    var fileData = await readFile(filePath);

    var zip = await JSZip.loadAsync(fileData);

    var mediaFiles = Object.keys(zip.files).filter((fileName) =>
      fileName.startsWith('xl/media/'),
    );

    if (mediaFiles.length == 0) return;

    var buffer = await Promise.all(
      mediaFiles.map(
        async (fileName) => await zip.files[fileName].async('nodebuffer'),
      ),
    );

    var base64 = buffer.map((buf) => Buffer.from(buf).toString('base64'));

    return base64;
  }

  async getDataFromXLSX(filePath) {
    var wb = new Exceljs.Workbook();

    await wb.xlsx.readFile(filePath);

    var ws: any = wb.getWorksheet('Лист1');

    var url: any = [];
    var qty: any = [];
    var size: any = [];
    var totalSum: any = [];
    var itemPrice: any = [];

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

    return [url, qty, size, totalSum, itemPrice];
  }

  async combineData(data, image, items, itemId) {
    var [url, qty, size, totalSum, itemPrice] = data;
    var fileData: any = [];

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
}
