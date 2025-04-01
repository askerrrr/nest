import { Injectable } from '@nestjs/common';

import { XlsxService } from '../xlsx/xlsx.service';
import { UserCollectionService } from '../database/user-collection/user.collection.service';

@Injectable()
export class OpenImgService {
  constructor(
    private xlsxService: XlsxService,
    private userCollection: UserCollectionService,
  ) {}

  async getFilePath(userId: string, orderId: string): Promise<string> {
    return await this.userCollection.findFilePath(userId, orderId);
  }

  async checkImageExists(userId: string, orderId: string): Promise<boolean> {
    return await this.xlsxService.checkFileExists(userId, orderId);
  }
}
