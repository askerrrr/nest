import { Injectable } from '@nestjs/common';
import { access, constants } from 'fs/promises';

import { UserCollectionService } from 'src/server/database/user.collection.service';

@Injectable()
export class DownloadFileService {
  constructor(private userCollection: UserCollectionService) {}
  async getFilePath(userId, orderId) {
    var filePath = await this.userCollection.findFilePath(userId, orderId);

    return filePath;
  }

  async checkFileExists(filePath) {
    var fileIsExists = await access(filePath, constants.F_OK)
      .then(() => true)
      .catch(() => false);

    return fileIsExists;
  }
}
