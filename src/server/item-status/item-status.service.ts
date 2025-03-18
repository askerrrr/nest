import { Injectable } from '@nestjs/common';

import { UtilsForItemStatus } from 'src/server/services/utilsForItemStatus';
import { UserCollectionService } from 'src/server/database/user.collection.service';
import { ItemCollectionService } from 'src/server/database/item-status.collection.service';

@Injectable()
export class ItemStatusService {
  constructor(
    private utils: UtilsForItemStatus,
    private itemCollection: ItemCollectionService,
    private userCollection: UserCollectionService,
  ) {}

  async getCurrentOrderStatus(userId, orderId) {
    return await this.userCollection.getCurrentOrderStatus(userId, orderId);
  }

  async changeItemStatus(userId, orderId, item) {
    var items = await this.itemCollection.getItems(userId, orderId);

    var itemValue = item?.split(':::')[0];
    var itemIndex = items?.findIndex((e) => e.startsWith(itemValue));
    items[itemIndex] = item;

    await this.itemCollection.updateItemStatus(userId, orderId, items);

    var isAllItemsArePurchased = await this.utils.allItemsArePurchased(items);

    if (isAllItemsArePurchased) {
      var currentOrderStatus = await this.userCollection.getCurrentOrderStatus(
        userId,
        orderId,
      );

      if (currentOrderStatus == 'in-processing:1') {
        await this.userCollection.updateOrderStatus(
          userId,
          orderId,
          'purchased:2',
        );

        await this.utils.sendOrderStatusUpdate(userId, orderId, 'purchased:2');
      }
    }
  }
}
