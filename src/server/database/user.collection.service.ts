import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserData, OrderData } from './user.collection.dto';
import { User, UserDocument } from 'src/server/schemas/user.schema';

@Injectable()
export class UserCollectionService {
  constructor(
    @InjectModel(User.name, 'main') private user: Model<UserDocument>,
  ) {}

  async getUser(userId: string) {
    return await this.user.findOne({ userId }).exec();
  }

  async getUsers() {
    return await this.user.find({}).exec();
  }

  async addNewOrder(order: OrderData): Promise<boolean> {
    var result = await this.user.updateOne(
      { userId: order.userId },
      { $push: { orders: { order } } },
    );

    return result.modifiedCount == 1;
  }

  async createNewUser(data: UserData) {
    var result = await this.user.insertOne({
      userId: data.userId,
      firstName: data.firstName,
      userName: data.userName,
      orders: [],
    });

    return result.id;
  }

  async deleteOrder(userId: string, orderId: string): Promise<boolean> {
    var result = await this.user.updateOne(
      { userId, 'orders.order.id': orderId },
      {
        $pull: { orders: { 'order.id': orderId } },
      },
    );

    return result.modifiedCount == 1;
  }

  async deleteUser(userId: string): Promise<boolean> {
    var result = await this.user.deleteOne({ userId });

    return result.deletedCount == 1;
  }

  async findFilePath(userId: string, orderId: string): Promise<string> {
    var { orders }: any = await this.user.findOne({ userId }).exec();
    var { order } = orders.find((e) => e.order.id == orderId);
    var { path } = order.file;

    return path;
  }

  async getCurrentOrderStatus(
    userId: string,
    orderId: string,
  ): Promise<string> {
    var { orders }: any = await this.user.findOne({ userId }).exec();
    var { order } = orders.find((e) => e.order.id == orderId);
    var { orderStatus } = order;

    return orderStatus;
  }

  async updateOrderStatus(
    userId: string,
    orderId: string,
    orderStatus: string,
  ): Promise<boolean> {
    var result = await this.user.updateOne(
      { userId, 'orders.order.id': orderId },
      {
        $set: { 'orders.$.order.orderStatus': orderStatus },
      },
    );

    return result.modifiedCount == 1;
  }
}
