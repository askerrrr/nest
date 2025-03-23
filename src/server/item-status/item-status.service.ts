import { Injectable } from '@nestjs/common';

import { UserCollectionService } from 'src/server/database/user.collection.service';
import { ItemCollectionService } from 'src/server/database/item-status.collection.service';

@Injectable()
export class ItemStatusService {
  constructor(
    private itemCollection: ItemCollectionService,
    private userCollection: UserCollectionService,
  ) {}

  async allItemsArePurchased(items): Promise<boolean> {
    var itemStatus = items?.map((item) => item.split(':::')[1]);

    return itemStatus?.every((status) => status == '1');
  }

  async allItemsAreDelivered(items): Promise<boolean> {
    var itemStatus = items?.map((item) => item.split(':::')[2]);

    return itemStatus?.every((status) => status == '1');
  }

  async sendOrderStatus(userId, orderId, orderStatus): Promise<boolean> {
    var response = await fetch(`${process.env.bot_server}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.bot_secret_key}`,
      },
      body: JSON.stringify({
        userId,
        orderId,
        orderStatus,
      }),
    });

    return response.status == 200;
  }

  async getCurrentOrderStatus(userId, orderId): Promise<string> {
    var orderStatus = await this.userCollection.getCurrentOrderStatus(
      userId,
      orderId,
    );

    return orderStatus;
  }

  async updateItemInArray(userId, orderId, newItem): Promise<string[]> {
    var items = await this.itemCollection.getItems(userId, orderId);

    var itemValues = items.map((e) => e.split(':::')[0]);

    var valueOfNewItem = newItem.split(':::')[0];

    var indexOfNewItemValue = itemValues.findIndex((e) => e === valueOfNewItem);

    items[indexOfNewItemValue] = newItem;

    return items;
  }

  async changePurchasedStatus(userId, orderId, newItem): Promise<boolean> {
    var items = await this.updateItemInArray(userId, orderId, newItem);

    var succesfullUpdateItemStatus: number =
      await this.itemCollection.updateItemStatus(userId, orderId, items);

    if (!succesfullUpdateItemStatus) {
      return false;
    }

    var isAllItemsArePurchased: boolean =
      await this.allItemsArePurchased(items);

    if (isAllItemsArePurchased) {
      var currentOrderStatus = await this.getCurrentOrderStatus(
        userId,
        orderId,
      );

      if (currentOrderStatus == 'in-processing:1') {
        var succesfullUpdateOrderStatus: boolean =
          await this.userCollection.updateOrderStatus(
            userId,
            orderId,
            'purchased:2',
          );

        var successfullResponse: boolean = await this.sendOrderStatus(
          userId,
          orderId,
          'purchased:2',
        );

        return successfullResponse && succesfullUpdateOrderStatus;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  async changeDeliveredStatus(userId, orderId, newItem): Promise<boolean> {
    var items: string[] = await this.updateItemInArray(
      userId,
      orderId,
      newItem,
    );

    var succesfullUpdateItemStatus: number =
      await this.itemCollection.updateItemStatus(userId, orderId, items);

    if (!succesfullUpdateItemStatus) {
      return false;
    }

    var isAllItemsArePurchased: boolean =
      await this.allItemsAreDelivered(items);

    if (isAllItemsArePurchased) {
      var currentOrderStatus = await this.getCurrentOrderStatus(
        userId,
        orderId,
      );

      if (currentOrderStatus == 'purchased:2') {
        var succesfullUpdateOrderStatus: boolean =
          await this.userCollection.updateOrderStatus(
            userId,
            orderId,
            'china-warehouse:3',
          );

        var successfullResponse: boolean = await this.sendOrderStatus(
          userId,
          orderId,
          'china-warehouse:3',
        );

        return successfullResponse && succesfullUpdateOrderStatus;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
