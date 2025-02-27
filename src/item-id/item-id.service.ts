import { Injectable } from '@nestjs/common';
import { ItemCollectionService } from 'src/database/item-status.collection.service';

@Injectable()
export class ItemIdService {
  constructor(private itemCollection: ItemCollectionService) {}
  async changeItemId(userId, orderId, index, itemId) {
    var itemsId = await this.itemCollection.getItemId(userId, orderId);
    itemsId[index] = itemId;
    await this.itemCollection.updateItemId(userId, orderId, itemId);
  }
}
