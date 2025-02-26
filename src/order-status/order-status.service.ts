import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class OrderStatusService {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}

  async getOrderStatus(userId, orderId) {
    var document = await this.user.findOne({
      userId,
      'orders.order.id': orderId,
    });

    var orderData = document?.orders.find((e) => e.order.id == orderId);
    var orderStatus = orderData?.order.orderStatus;
    return orderStatus;
  }

  async changeOrderStatus(userId, orderId, status) {
    var [statusValue, statusId] = status.split(':');

    statusId = statusId.split('').reverse()[0];

    var orderStatus = statusValue + ':' + statusId;
    await this.sendOrderStatusUpdate(userId, orderId, orderStatus);
    await this.user.updateOne(
      { userId, 'orders.order.id': orderId },
      {
        $set: { 'orders.$.order.orderStatus': status },
      },
    );
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
