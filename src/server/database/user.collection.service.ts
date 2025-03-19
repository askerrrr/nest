import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from 'src/server/schemas/user.schema';

@Injectable()
export class UserCollectionService {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}

  async getAllUsers() {
    return await this.user.find({}).exec();
  }

  async getUserData(userId, orderId) {
    return await this.user
      .findOne({
        userId,
        'orders.order.id': orderId,
      })
      .exec();
  }

  async getOrderData(orderId) {
    return this.user.findOne({ 'orders.order.id': orderId }).exec();
  }

  async getUser(userId) {
    return await this.user.findOne({ userId }).exec();
  }

  async getActiveOrders(userId) {
    var { orders }: any = await this.user.findOne({ userId }).exec();

    var activeOrders = orders.filter(
      (e) => e.order.orderStatus !== 'order-is-completed:6',
    );

    return activeOrders;
  }

  async getCompletedOrders(userId) {
    var { orders }: any = await this.user.findOne({ userId }).exec();

    var completedOrders = orders.filter(
      (e) => e.order.orderStatus == 'order-is-completed:6',
    );

    return completedOrders;
  }
  async addNewOrder(order) {
    return await this.user.updateOne(
      { userId: order.userId },
      { $push: { orders: { order } } },
    );
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
    var { orders }: any = await this.user.findOne({ userId }).exec();
    var { order } = orders.find((e) => e.order.id == orderId);
    var filePath = order.file.path;

    return filePath;
  }

  async findUser(userId) {
    return await this.user.findOne({ userId }).exec();
  }

  async getCurrentOrderStatus(userId, orderId) {
    var { orders }: any = await this.user.findOne({ userId }).exec();
    var { order } = orders.find((e) => e.order.id == orderId);
    var { orderStatus } = order;

    return orderStatus;
  }

  async updateOrderStatus(userId, orderId, status) {
    return await this.user.updateOne(
      { userId, 'orders.order.id': orderId },
      {
        $set: { 'orders.$.order.orderStatus': status },
      },
    );
  }
}
