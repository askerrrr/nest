import { Readable } from 'node:stream';
import { mkdir, open } from 'node:fs/promises';

export class UtilsForBotApi {
  getUserPath(path: string): string {
    return path.split('/').slice(0, -1).join('/');
  }

  async makeUserDir(path: string): Promise<boolean> {
    var userDir = this.getUserPath(path);

    try {
      var result = await mkdir(userDir, { recursive: true });

      return result || result == undefined ? true : false;
    } catch (err) {
      return false;
    }
  }

  async writeFile(path: string, readableStream: Readable): Promise<boolean> {
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

  async downloadOrderFile(url: string, path: string): Promise<boolean> {
    try {
      var userDir: boolean = await this.makeUserDir(path);

      if (!userDir) {
        return false;
      }

      var readableStream = await this.getFileData(url);

      if (!readableStream) {
        return false;
      }

      return await this.writeFile(path, readableStream);
    } catch (err) {
      return false;
    }
  }
}
