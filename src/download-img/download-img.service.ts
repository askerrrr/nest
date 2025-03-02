import { Injectable } from '@nestjs/common';
import { UserCollectionService } from 'src/database/user.collection.service';

@Injectable()
export class DownloadImgService {
  constructor(private userCollection: UserCollectionService) {}
  async downloadImg(userId, orderId) {
    var filePath = await this.userCollection.findFilePath(userId, orderId);

    return filePath;
  }
}
