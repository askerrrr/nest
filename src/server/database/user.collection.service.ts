import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from 'src/server/schemas/user.schema';

@Injectable()
export class UserCollectionService {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}

  async getUser(userId) {
    var user = await this.user.findOne({ userId }).exec();

    return user;
  }

  async getUsers() {
    var users = await this.user.find({}).exec();

    return users;
  }

  async getActiveOrders(userId) {
    var { orders }: any = await this.getUser(userId);

    var activeOrders = orders.filter(
      (e) => e.order.orderStatus !== 'order-is-completed:6',
    );

    return activeOrders;
  }

  async getCompletedOrders(userId) {
    var { orders }: any = await this.getUser(userId);

    var completedOrders = orders.filter(
      (e) => e.order.orderStatus == 'order-is-completed:6',
    );

    return completedOrders;
  }
  async addNewOrder(order) {
    var result = await this.user.updateOne(
      { userId: order.userId },
      { $push: { orders: { order } } },
    );

    return result.modifiedCount;
  }

  async createNewUser(order) {
    await this.user.insertOne({
      userId: order.userId,
      firstName: order.firstName,
      userName: order.userName,
      orders: [],
    });
  }

  async deleteOrder(userId, orderId) {
    var result = await this.user.updateOne(
      { userId, 'orders.order.id': orderId },
      {
        $pull: { orders: { 'order.id': orderId } },
      },
    );

    return result.modifiedCount;
  }

  async deleteUser(userId) {
    var result = await this.user.deleteOne({ userId });

    return result.deletedCount;
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

    return result.modifiedCount;
  }
}
