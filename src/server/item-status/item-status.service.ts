import { Injectable } from '@nestjs/common';

import { UserCollectionService } from '../database/user-collection/user.collection.service';
import { ItemCollectionService } from '../database/item-collection/item-status.collection.service';

@Injectable()
export class ItemStatusService {
  constructor(
    private readonly itemCollection: ItemCollectionService,
    private readonly userCollection: UserCollectionService,
  ) {}

  async allItemsArePurchased(items: string[]): Promise<boolean> {
    var itemStatus = items?.map((item) => item.split(':::')[1]);

    return itemStatus?.every((status) => status == '1');
  }

  async allItemsAreDelivered(items: string[]): Promise<boolean> {
    var itemStatus = items?.map((item) => item.split(':::')[2]);

    return itemStatus?.every((status) => status == '1');
  }

  async sendOrderStatus(userId, orderId, orderStatus): Promise<boolean> {
    var response = await fetch(process.env.bot_server + '', {
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

  async getOrderStatus(userId: string, orderId: string): Promise<string> {
    return await this.userCollection.getOrderStatus(userId, orderId);
  }

  async updateItemInArray(userId, orderId, newItem): Promise<string[]> {
    var items: string[] = await this.itemCollection.getItems(userId, orderId);

    var itemValues = items.map((e) => e.split(':::')[0]);

    var valueOfNewItem = newItem.split(':::')[0];

    var indexOfNewItemValue = itemValues.findIndex((e) => e === valueOfNewItem);

    items[indexOfNewItemValue] = newItem;

    return items;
  }

  async changePurchasedStatus(
    userId: string,
    orderId: string,
    newItem: string,
  ): Promise<boolean> {
    var items: string[] = await this.updateItemInArray(
      userId,
      orderId,
      newItem,
    );

    var succesfullUpdateItemStatus: boolean =
      await this.itemCollection.updateItemStatus(userId, orderId, items);

    if (!succesfullUpdateItemStatus) {
      return false;
    }

    var isAllItemsArePurchased: boolean =
      await this.allItemsArePurchased(items);

    if (isAllItemsArePurchased) {
      var currentOrderStatus = await this.getOrderStatus(userId, orderId);

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

  async changeDeliveredStatus(
    userId: string,
    orderId: string,
    newItem: string,
  ): Promise<boolean> {
    var items: string[] = await this.updateItemInArray(
      userId,
      orderId,
      newItem,
    );

    var succesfullUpdateItemStatus: boolean =
      await this.itemCollection.updateItemStatus(userId, orderId, items);

    if (!succesfullUpdateItemStatus) {
      return false;
    }

    var isAllItemsArePurchased: boolean =
      await this.allItemsAreDelivered(items);

    if (isAllItemsArePurchased) {
      var currentOrderStatus = await this.getOrderStatus(userId, orderId);

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
