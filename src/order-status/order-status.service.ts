//import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
//import { InjectModel } from '@nestjs/mongoose';
//import { User, UserDocument } from 'src/schemas/user.schema';
import { DatabaseService } from 'src/database/user.collection.service';

@Injectable()
export class OrderStatusService {
  constructor(private databaseService: DatabaseService) {}
  async getOrderStatus(userId, orderId) {
    var document = await this.databaseService.getUserData(userId, orderId);
    var orderData = document?.orders.find((e) => e.order.id == orderId);
    var orderStatus = orderData?.order.orderStatus;
    return orderStatus;
  }

  async changeOrderStatus(userId, orderId, status) {
    var [statusValue, statusId] = status.split(':');

    statusId = statusId.split('').reverse()[0];

    var orderStatus = statusValue + ':' + statusId;
    await this.sendOrderStatusUpdate(userId, orderId, orderStatus);
    await this.databaseService.updateOrderStatus(userId, orderId, status);
  }

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
}
