import { Injectable } from '@nestjs/common';
import { UserCollectionService } from 'src/database/user.collection.service';
import { ItemCollectionService } from 'src/database/item-status.collection.service';

@Injectable()
export class ItemStatusService {
  constructor(
    private item: ItemCollectionService,
    private user: UserCollectionService,
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
    var items = await this.item.getItemStatus(userId, orderId);

    var itemStatus = items.map((item) => item.split(':::')[1]);

    return itemStatus.every((e) => e == '2');
  }

  async getItemStatus(userId, orderId) {
    return await this.item.getItemStatus(userId, orderId);
  }

  async changeItemStatus(userId, orderId, item) {
    await this.item.updateItemStatus(userId, orderId, item);

    var isAllItemsArePurchased = await this.allItemsArePurchased(
      userId,
      orderId,
    );

    if (isAllItemsArePurchased) {
      var currentOrderStatus = await this.user.getCurrentOrderStatus(
        userId,
        orderId,
      );

      if (currentOrderStatus == 'in-processing:1') {
        await this.user.updateOrderStatus(userId, orderId, 'purchased:2');

        var isStatusUpdated = await this.sendOrderStatusUpdate(
          userId,
          orderId,
          'purchased:2',
        );

        if (!isStatusUpdated) return;
      }
    }
  }
}
