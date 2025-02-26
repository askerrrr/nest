import { rm } from 'fs/promises';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class OrderService {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}
  async getUserData(userId) {
    return await this.user.findOne({ userId }).exec();
  }

  async getOrderData(orderId) {
    var document = await this.user.findOne({ 'orders.order.id': orderId });
    var order = document?.orders.find((e) => e.order.id == orderId);
    return order;
  }

  async getOrderList(userId) {
    var existingDocument = await this.user.findOne({ userId }).exec();

    return existingDocument?.orders.length;
  }

  async deleteUser(userId) {
    await this.user.deleteOne({ userId });
    await rm('/var/www/userFiles/' + userId);
  }

  async deleteUserOrder(userId, orderId) {
    await this.user.updateOne(
      { userId, 'orders.order.id': orderId },
      {
        $pull: { orders: { 'order.id': orderId } },
      },
    );

    var filePath = await this.findFilePath(userId, orderId);
    await rm(filePath);
    await this.deleteUserDataFromBot(userId, orderId);
  }

  async findFilePath(userId, orderId) {
    var document = await this.user.findOne({
      userId,
      'orders.order.id': orderId,
    });

    var filePath = document?.orders.filter((e) => e.order.id == orderId)[0]
      .order.file.path;

    return filePath + '';
  }

  async deleteUserDataFromBot(userId, orderId) {
    var botResponse = await fetch('env.bot_server_ip', {
      method: 'DELETE',
      body: JSON.stringify({ userId, orderId }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${'env.bearer_token'}`,
      },
    });

    if (!botResponse.ok) throw new Error(`${botResponse.statusText}`);
  }
}
