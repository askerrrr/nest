import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class OrderService {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}
  async getUser(userId) {
    var orders = await this.user.findOne({userId}).exec()

    return orders?.orders
  }

  getOrder(orderId) {}

  getOrderFile(orderId) {}

  async getOrderList(userId) {
    var existingDocument = await this.user.findOne({ userId }).exec();

    return existingDocument?.orders.length;
  }

  deleteUser(userId) {}

  deleteOrder(userId, orderId) {}
}
