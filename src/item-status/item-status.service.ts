import { Injectable } from '@nestjs/common';
import { UserCollectionService } from 'src/database/user.collection.service';
import { ItemCollectionService } from 'src/database/item-status.collection.service';
import { UtilsForItemStatus } from 'src/services/utilsForItemStatus';

@Injectable()
export class ItemStatusService {
  constructor(
    private utils: UtilsForItemStatus,
    private itemCollection: ItemCollectionService,
    private userCollection: UserCollectionService,
  ) {}

  async getItemStatus(userId, orderId) {
    return await this.itemCollection.getItemStatus(userId, orderId);
  }

  async updateItemStatus(userId, orderId, item) {
    var items = await this.itemCollection.getItemStatus(userId, orderId);

    var value = item?.split(':::')[0];
    var itemIndex = items?.findIndex((e) => e.startsWith(value));
    items![itemIndex!] = item;

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
