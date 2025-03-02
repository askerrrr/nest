import { Injectable } from '@nestjs/common';

import { UserCollectionService } from 'src/database/user.collection.service';

@Injectable()
export class DownloadFileService {
  constructor(private userCollection: UserCollectionService) {}
  async downloadFile(userId, orderId) {
    var filePath = await this.userCollection.findFilePath(userId, orderId);

    return filePath;
  }
}
