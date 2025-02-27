import { Injectable } from '@nestjs/common';
import { UserCollectionService } from 'src/database/user.collection.service';
import { ItemCollectionService } from 'src/database/item-status.collection.service';

@Injectable()
export class ItemStatusService {
  constructor(
    private itemCollection: ItemCollectionService,
    private userCollection: UserCollectionService,
  ) {}

  async sendOrderStatusUpdate(userId, orderId, orderStatus) {
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

    if (!response.ok) {
      var err = await response.text();
      console.log('Ошибка при отправлении статуса боту: ', err);
      return;
    }
  }

  async allItemsArePurchased(userId, orderId) {
    var items = await this.itemCollection.getItemStatus(userId, orderId);

    var itemStatus = items?.map((e) => e.split(':::')[1]);

    return itemStatus?.every((e) => e == '2');
  }

  async getItemStatus(userId, orderId) {
    return await this.itemCollection.getItemStatus(userId, orderId);
  }

  async updateItemStatus(userId, orderId, item) {
    var items = await this.itemCollection.getItemId(userId, orderId);

    var value = item?.split(':::')[0];
    var itemIndex = items?.findIndex((e) => e.startsWith(value));
    items![itemIndex!] = item;

    await this.itemCollection.updateItemStatus(userId, orderId, items);

    var isAllItemsArePurchased = await this.allItemsArePurchased(
      userId,
      orderId,
    );

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

        await this.sendOrderStatusUpdate(userId, orderId, 'purchased:2');
      }
    }
  }
}
