import { Injectable } from '@nestjs/common';

import { ItemCollectionService } from 'src/server/database/item-status.collection.service';

@Injectable()
export class ItemIdService {
  constructor(private itemCollection: ItemCollectionService) {}
  async updateItemId(userId, orderId, index, newItemId) {
    await this.itemCollection.updateItemId(userId, orderId, index, newItemId);
  }
}
