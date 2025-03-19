import { Injectable } from '@nestjs/common';

import { UserCollectionService } from 'src/server/database/user.collection.service';
import { ItemCollectionService } from 'src/server/database/item-status.collection.service';

@Injectable()
export class ItemStatusService {
  constructor(
    private itemCollection: ItemCollectionService,
    private userCollection: UserCollectionService,
  ) {}

  async allItemsArePurchased(items) {
    var itemStatus = items?.map((item) => item.split(':::')[1]);

    return itemStatus?.every((status) => status == '1');
  }

  async allItemsAreDelivered(items) {
    var itemStatus = items?.map((item) => item.split(':::')[2]);

    return itemStatus?.every((status) => status == '1');
  }

  async sendOrderStatus(userId, orderId, orderStatus) {
    var response = await fetch('env.bot_server_ip', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${'env.bearer_token'}`,
      },
      body: JSON.stringify({
        userId,
        orderId,
        orderStatus,
      }),
    });

    return response.status;
  }

  async getCurrentOrderStatus(userId, orderId) {
    return await this.userCollection.getCurrentOrderStatus(userId, orderId);
  }

  async updateItemInArray(userId, orderId, newItem) {
    var items = await this.itemCollection.getItems(userId, orderId);

    var itemValues = items.map((e) => e.split(':::')[0]);

    var valueOfNewItem = newItem.split(':::')[0];

    var indexOfNewItemValue = itemValues.findIndex((e) => e === valueOfNewItem);

    items[indexOfNewItemValue] = newItem;

    return items;
  }

  async changePurchasedStatus(userId, orderId, newItem) {
    var items = await this.updateItemInArray(userId, orderId, newItem);

    var succesfullUpdate = await this.itemCollection.updateItemStatus(
      userId,
      orderId,
      items,
    );

    if (!succesfullUpdate) {
      return 304;
    }

    var isAllItemsArePurchased = await this.allItemsArePurchased(items);

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

        var responseStatus: any = await this.sendOrderStatus(
          userId,
          orderId,
          'purchased:2',
        );
        if (responseStatus == 200) {
          return responseStatus;
        } else {
          return 304;
        }
      }
    } else {
      return 200;
    }
  }

  async changeDeliveredStatus(userId, orderId, newItem) {
    var items = await this.updateItemInArray(userId, orderId, newItem);

    var succesfullUpdate = await this.itemCollection.updateItemStatus(
      userId,
      orderId,
      items,
    );

    if (!succesfullUpdate) {
      return 304;
    }

    var isAllItemsArePurchased = await this.allItemsAreDelivered(items);

    if (isAllItemsArePurchased) {
      var currentOrderStatus = await this.userCollection.getCurrentOrderStatus(
        userId,
        orderId,
      );

      if (currentOrderStatus == 'purchased:2') {
        await this.userCollection.updateOrderStatus(
          userId,
          orderId,
          'china-warehouse:3',
        );

        var responseStatus: any = await this.sendOrderStatus(
          userId,
          orderId,
          'china-warehouse:3',
        );

        if (responseStatus == 200) {
          return responseStatus;
        } else {
          return 304;
        }
      }
    } else {
      return 200;
    }
  }
}
