import { join } from 'path';
import { mkdir, open } from 'fs/promises';

export class UtilsForBotApi {
  async makeUserDir(userId: string) {
    var userDir = join('/var', 'www', 'userFiles', userId);
    var orderDirs = ['docs', 'images'];

    try {
      await mkdir(userDir, { recursive: true });

      await Promise.all(
        orderDirs.map((dir) => mkdir(userDir + '/' + dir, { recursive: true })),
      );

      return orderDirs.map((dir) => join(userDir, dir));
    } catch (err) {
      console.log(err);
    }
  }

  async writeFile(path, data) {
    var fileHandle;

    try {
      fileHandle = await open(path, 'w');
      var writableStream = await fileHandle.createWriteStream();

      var chunk;

      for await (chunk of data) {
        writableStream.write(chunk);
      }

      var successfullDownload = await new Promise((resolve, reject) => {
        writableStream.on('error', () => reject(false));

        writableStream.on('finish', () => {
          console.log('The file is written');
          resolve(true);
        });

        writableStream.end();
      });

      return successfullDownload;
    } catch (err) {
    } finally {
      await fileHandle?.close();
    }
  }

  async getOrderDetailsForBot(data) {
    var arr: any = [];

    for (var i = 0; i < data?.orders.length; i++) {
      arr.push({
        userId: data.userId,
        id: data.orders[i].order.orderId,
        date: data.orders[i].order.date,
        phone: data.orders[i].order.phone,
        orderStatus: data.orders[i].order.orderStatus,
      });
    }

    return arr;
  }

  async getFileData(url: string) {
    var response = await fetch(url);

    if (!response.ok) {
      return;
    }

    return response.body;
  }

  async downloadAndSaveFile(userId, fileId, url, orderType) {
    try {
      var userDir: any = await this.makeUserDir(userId);

      var docsPath: string = join(userDir[0], fileId + '.xlsx');
      var imagesPath: string = join(userDir[1], fileId + '.jpg');

      var dataStream = await this.getFileData(url);

      if (orderType == 'single') {
        return await this.writeFile(imagesPath, dataStream);
      } else if (orderType == 'muiltiple') {
        return await this.writeFile(docsPath, dataStream);
      }
    } catch (err) {
      console.log(
        `Error loading and saving the file ${fileId}. Error : ${err}`,
      );
    }
  }
}
