import { Injectable } from '@nestjs/common';
import { ItemStatusCollectionService } from 'src/database/item-status.collection.service';

@Injectable()
export class ItemStatusService {
  constructor(private itemStatus: ItemStatusCollectionService) {}
  async getItemStatus(userId, orderId) {
    return await this.itemStatus.getItemStatus(userId, orderId);
  }

  changeItemStatus() {}
}
