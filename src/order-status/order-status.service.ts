import { Injectable } from '@nestjs/common';
import { UserCollectionService } from 'src/database/user.collection.service';

@Injectable()
export class OrderStatusService {
  constructor(private userCollection: UserCollectionService) {}
  async getOrderStatus(userId, orderId) {
    var document = await this.userCollection.getUserData(userId, orderId);
    var orderData = document?.orders.find((e) => e.order.id == orderId);
    var orderStatus = orderData?.order.orderStatus;
    return orderStatus;
  }

  async changeOrderStatus(userId, orderId, status) {
    var [statusValue, statusId] = status.split(':');

    statusId = statusId.split('').reverse()[0];

    var orderStatus = statusValue + ':' + statusId;
    await this.sendOrderStatusUpdate(userId, orderId, orderStatus);
    await this.userCollection.updateOrderStatus(userId, orderId, status);
  }

  async sendOrderStatusUpdate(userId, orderId, orderStatus) {
    await fetch('env.bot_server_ip', {
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
  }
}
