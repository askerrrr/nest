import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from 'src/server/schemas/user.schema';

@Injectable()
export class UserCollectionService {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}

  async getUser(userId) {
    return await this.user.findOne({ userId }).exec();
  }

  async getUsers() {
    return await this.user.find({}).exec();
  }

  async addNewOrder(order) {
    var result = await this.user.updateOne(
      { userId: order.userId },
      { $push: { orders: { order } } },
    );

    return result.modifiedCount;
  }

  async createNewUser(data) {
    var result = await this.user.insertOne({
      userId: data.userId,
      firstName: data.firstName,
      userName: data.userName,
      orders: [],
    });

    return result.id;
  }

  async deleteOrder(userId, orderId) {
    var result = await this.user.updateOne(
      { userId, 'orders.order.id': orderId },
      {
        $pull: { orders: { 'order.id': orderId } },
      },
    );

    return result.modifiedCount == 1;
  }

  async deleteUser(userId) {
    var result = await this.user.deleteOne({ userId });

    return result.deletedCount == 1;
  }

  async findFilePath(userId, orderId) {
    var { orders }: any = await this.getUser(userId);
    var { order } = orders.find((e) => e.order.id == orderId);
    var { path } = order.file;

    return path;
  }

  async getCurrentOrderStatus(userId, orderId) {
    var { orders }: any = await this.getUser(userId);
    var { order } = orders.find((e) => e.order.id == orderId);
    var { orderStatus } = order;

    return orderStatus;
  }

  async updateOrderStatus(userId, orderId, status) {
    var result = await this.user.updateOne(
      { userId, 'orders.order.id': orderId },
      {
        $set: { 'orders.$.order.orderStatus': status },
      },
    );

    return result.modifiedCount == 1;
  }
}
