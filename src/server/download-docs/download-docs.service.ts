import { Injectable } from '@nestjs/common';
import { access, constants } from 'fs/promises';

import { UserCollectionService } from 'src/server/database/user.collection.service';

@Injectable()
export class DownloadFileService {
  constructor(private userCollection: UserCollectionService) {}
  async getFilePath(userId, orderId): Promise<string> {
    var filePath: string = await this.userCollection.findFilePath(
      userId,
      orderId,
    );

    return filePath;
  }

  async checkFileExists(filePath): Promise<boolean> {
    var fileIsExists: boolean = await access(filePath, constants.F_OK)
      .then(() => true)
      .catch(() => false);

    return fileIsExists;
  }
}
