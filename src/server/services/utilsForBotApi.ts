import { join } from 'path';
import { Readable } from 'stream';
import { mkdir, open } from 'fs/promises';

export class UtilsForBotApi {
  async makeUserDir(userId: string): Promise<string[]> {
    var userDir = join('/var', 'www', 'userFiles', userId);
    var orderDirs = ['docs', 'images'];

    await mkdir(userDir, { recursive: true });

    await Promise.all(
      orderDirs.map((dir) => mkdir(userDir + '/' + dir, { recursive: true })),
    );

    return orderDirs.map((dir) => join(userDir, dir));
  }

  async writeFile(path: string, readableStream: any): Promise<boolean> {
    var fileHandle: any;
    var successWrite: boolean;

    try {
      fileHandle = await open(path, 'w');
      var writableStream = await fileHandle.createWriteStream();

      readableStream.on('error', () => writableStream.destroy());

      var chunk: any;

      for await (chunk of readableStream) {
        var canWrite = writableStream.write(chunk);

        if (!canWrite) {
          await new Promise((resolve) => writableStream.once('drain', resolve));
        }
      }

      successWrite = await new Promise((resolve, reject) => {
        writableStream.once('error', () => reject(false));

        writableStream.once('finish', () => {
          console.log('The file is written');
          return resolve(true);
        });

        writableStream.end();
      });
    } catch (err) {
      return false;
    } finally {
      await fileHandle?.close();
    }

    return successWrite;
  }

  async getOrderDetailsForBot(orders) {
    var arr: any = [];

    for (var i = 0; i < orders.length; i++) {
      arr.push({
        userId: orders[i].order.userId,
        id: orders[i].order.id,
        phone: orders[i].order.phone,
        date: orders[i].order.date,
        orderStatus: orders[i].order.orderStatus,
      });
    }

    return arr;
  }

  async getFileData(url: string): Promise<Readable | false> {
    var response: any = await fetch(url);

    if (!response.ok) {
      return false;
    }

    return Readable.fromWeb(response.body);
  }

  async downloadOrderFile(
    userId: string,
    fileId: string,
    url: string,
    orderType: string,
  ): Promise<boolean> {
    try {
      var userDir: any = await this.makeUserDir(userId);

      var docsPath: string = join(userDir[0], fileId + '.xlsx');
      var imagesPath: string = join(userDir[1], fileId + '.jpg');

      var readableStream = await this.getFileData(url);

      return orderType == 'single'
        ? await this.writeFile(imagesPath, readableStream)
        : await this.writeFile(docsPath, readableStream);
    } catch (err) {
      console.log(
        `Error loading and saving the file ${fileId}. Error : ${err}`,
      );
      return false;
    }
  }
}
