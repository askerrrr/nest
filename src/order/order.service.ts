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

  async getOrderFile(orderId) {}

  async getOrderList(userId) {
    var existingDocument = await this.user.findOne({ userId }).exec();

    return existingDocument?.orders.length;
  }

  async deleteUser(userId) {}

  async deleteOrder(userId, orderId) {}
}
