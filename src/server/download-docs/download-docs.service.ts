import { Injectable } from '@nestjs/common';
import { access, constants } from 'fs/promises';

import { UserCollectionService } from 'src/server/database/user.collection.service';

@Injectable()
export class DownloadFileService {
  constructor(private userCollection: UserCollectionService) {}
  async getFilePath(userId: string, orderId: string): Promise<string> {
    return await this.userCollection.findFilePath(userId, orderId);
  }

  async checkFileExists(filePath: string): Promise<boolean> {
    return await access(filePath, constants.F_OK)
      .then(() => true)
      .catch(() => false);
  }
}
