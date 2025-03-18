import { Injectable } from '@nestjs/common';

import { UserCollectionService } from 'src/server/database/user.collection.service';

@Injectable()
export class OpenImgService {
  constructor(private userCollection: UserCollectionService) {}
  async openImg(userId, orderId) {
    var filePath = await this.userCollection.findFilePath(userId, orderId);

    return filePath;
  }
}
