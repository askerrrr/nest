import { pipeline, Readable } from 'node:stream';
import { FileHandle, mkdir, open } from 'node:fs/promises';

export class UtilsForBotApi {
  getUserPath(path: string): string {
    return path.split('/').slice(0, -1).join('/');
  }

  async createUserDir(path: string): Promise<boolean> {
    var userDir = this.getUserPath(path);

    try {
      var result = await mkdir(userDir, { recursive: true });

      return result || result == undefined ? true : false;
    } catch (err) {
      throw err;
    }
  }

  async writeFile(path: string, readableStream: Readable): Promise<boolean> {
    var fileHandle: FileHandle = await open(path, 'w');

    try {
      var writableStream = fileHandle.createWriteStream();

      pipeline(readableStream, writableStream);
    } finally {
      await fileHandle?.close();
    }

    return true;
  }

  async getOrderDetailsForBot(orders) {
    var data: any = [];

    for (var i = 0; i < orders.length; i++) {
      data.push({
        userId: orders[i].order.userId,
        id: orders[i].order.id,
        phone: orders[i].order.phone,
        date: orders[i].order.date,
        orderStatus: orders[i].order.orderStatus,
      });
    }

    return data;
  }

  async getOrderFileStream(url: string): Promise<Readable | false> {
    var response: any = await fetch(url);

    if (!response.ok) {
      throw new Error('NoReadableStream');
    }

    return Readable.fromWeb(response.body);
  }

  async downloadOrderFile(url: string, path: string): Promise<boolean> {
    try {
      await this.createUserDir(path);

      var readableStream = await this.getOrderFileStream(url);

      if (!readableStream) {
        return false;
      }

      return await this.writeFile(path, readableStream);
    } catch (err) {
      throw err;
    }
  }
}
