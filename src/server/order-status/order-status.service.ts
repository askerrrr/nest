import { Injectable } from '@nestjs/common';

import { UtilsForItemStatus } from 'src/server/services/utilsForItemStatus';
import { UserCollectionService } from 'src/server/database/user.collection.service';

@Injectable()
export class OrderStatusService {
  constructor(
    private userCollection: UserCollectionService,
    private utilsForItemStatus: UtilsForItemStatus,
  ) {}
  async getOrderStatus(userId, orderId) {
    var document = await this.userCollection.getUserData(userId, orderId);

    var orderData = document?.orders.find((e) => e.order.id == orderId);
    var orderStatus = orderData?.order.orderStatus;

    return { orderStatus };
  }

  async changeOrderStatus(userId, orderId, status) {
    var [statusValue, statusId] = status.split(':');

    statusId = statusId.split('').reverse()[0];

    var orderStatus = statusValue + ':' + statusId;

    await this.utilsForItemStatus.sendOrderStatusUpdate(
      userId,
      orderId,
      orderStatus,
    );
    await this.userCollection.updateOrderStatus(userId, orderId, status);
  }
}
