import { Injectable } from '@nestjs/common';

import { ItemStatusService } from '../item-status/item-status.service';
import { UserCollectionService } from 'src/server/database/user.collection.service';

@Injectable()
export class OrderStatusService {
  constructor(
    private userCollection: UserCollectionService,
    private itemStatusService: ItemStatusService,
  ) {}
  async getOrderStatus(userId, orderId) {
    var { orders }: any = await this.userCollection.getUserData(
      userId,
      orderId,
    );

    var { order } = orders.find((e) => e.order.id == orderId);
    var { orderStatus } = order;

    return { orderStatus };
  }

  async changeOrderStatus(userId, orderId, status) {
    await this.itemStatusService.sendOrderStatus(userId, orderId, status);
    await this.userCollection.updateOrderStatus(userId, orderId, status);
  }
}
