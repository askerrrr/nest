import { join, resolve } from 'path';
import { mkdir, open } from 'fs/promises';

export class UtilsForBotApi {
  async makeUserDir(userId) {
    var userDir = join('/var', 'www', 'userFiles', userId);
    var dirs = ['docs', 'images'];

    try {
      await mkdir(userDir, { recursive: true });

      await Promise.all(
        dirs.map((dir) => mkdir(userDir + '/' + dir, { recursive: true })),
      );

      return dirs.map((dir) => join(userDir, dir));
    } catch (err) {
      console.log(err);
    }
  }

  async writeFile(path, data) {
    var fileHandle;

    try {
      fileHandle = await open(path, 'w');
      var writableStream = fileHandle.createWriteStream();

      var chunk;

      for await (chunk of data) {
        writableStream.write(chunk);
      }

      var successfullDownload = await new Promise((resolve, reject) => {
        writableStream.on('error', (err) => {
          console.log(path, err);
          reject(err);
        });

        writableStream.on('finish', () => {
          console.log('The file is written');
          resolve(true);
        });

        writableStream.end();
      });

      return successfullDownload;
    } catch (err) {
      console.log(err);
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

  async getFileData(url) {
    var response = await fetch(url);

    if (!response.ok) {
      var err = await response.text();
      console.log(err);
      return;
    }

    return response.body;
  }

  async downloadAndSaveFile(userId, fileId, url, order) {
    try {
      var userDir: any = await this.makeUserDir(userId);

      var docsPath = join(userDir[0], fileId + '.xlsx');
      var imagesPath = join(userDir[1], fileId + '.jpg');

      var dataStream = await this.getFileData(url);

      return order.type == 'single'
        ? await this.writeFile(imagesPath, dataStream)
        : await this.writeFile(docsPath, dataStream);
    } catch (err) {
      console.log(
        `Error loading and saving the file ${fileId}. Error : ${err}`,
      );
    }
  }
}
