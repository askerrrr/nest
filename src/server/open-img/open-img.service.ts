import { Injectable } from '@nestjs/common';

import { XlsxService } from '../xlsx/xlsx.service';
import { UserCollectionService } from 'src/server/database/user.collection.service';

@Injectable()
export class OpenImgService {
  constructor(
    private userCollection: UserCollectionService,
    private xlsxService: XlsxService,
  ) {}

  async getFilePath(userId, orderId): Promise<string> {
    var filePath = await this.userCollection.findFilePath(userId, orderId);

    return filePath;
  }

  async checkImageExists(userId, orderId): Promise<boolean> {
    var filePath = await this.userCollection.findFilePath(userId, orderId);

    var fileIsExists = await this.xlsxService.checkFileExists(filePath);

    return fileIsExists;
  }
}
