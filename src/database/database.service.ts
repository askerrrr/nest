import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class DatabaseService {
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
    return await this.user.findOne(userId).exec();
  }
  async addItems(userId, orderId, xlsxData) {
    var url = xlsxData[0];

    await this.user.updateOne(
      { userId: userId },
      {
        $push: { orders: { order: { id: orderId, items: [], itemId: [] } } },
      },
    );

    var items = url.map((item, index) => {
      {
        if (item?.startsWith('http')) {
          return item.split('://')[1] + ':::' + 0;
        } else {
          return 'неопознанная ссылка' + index + ':::' + 0;
        }
      }
    });

    return await this.user.updateOne(
      { userId: userId, 'orders.order.id': orderId },
      {
        $set: { 'orders.$.order.items': items },
      },
    );
  }

  async addNewOrder(order) {
    return await this.user.updateOne(
      { userId: order.userId },
      { $push: { orders: { order } } },
    );
  }

  async createItemStatus(user) {
    (await this.user.insertOne({ userId: user.userId, orders: [] })).save();
  }

  async createNewUser(order) {
    return await this.user.insertOne({
      userId: order.userId,
      firstName: order.firstName,
      userName: order.userName,
      orders: [],
    });
  }

  async deleteOrder(userId, orderId) {
    return await this.user.updateOne(
      { userId, 'orders.order.id': orderId },
      {
        $pull: { orders: { 'order.id': orderId } },
      },
    );
  }

  async deleteUser(userId) {
    await this.user.deleteOne({ userId });
  }

  async findFilePath(userId, orderId) {
    var data = await this.user
      .findOne({
        userId,
        'orders.order.id': orderId,
      })
      .exec();

    var filePath = data.orders.filter((item) => item.order.id === orderId)[0]
      .order.file.path;

    return filePath;
  }

  async findUser(user) {
    var document = await this.user.findOne({ user: user }).exec();

    return document.user;
  }

  async getCurrentOrderStatus(userId, orderId) {
    var document = await this.user
      .findOne({
        userId,
        'orders.order.id': orderId,
      })
      .exec();

    var orderStatus = document.orders.flatMap(
      (orders) => orders.order.orderStatus,
    );

    return orderStatus[0];
  }

  //   async getItemId(userId, orderId) {
  //     var user = await this.itemStatus.findOne({
  //       userId,
  //       'orders.order.id': orderId,
  //     }).exec();

  //     var itemId = user.orders.map((order) => order.order.itemId).flat();

  //     return itemId;
  //   }

  //   async getItemStatus(userId, orderId) {
  //     var document = await this.itemStatus.findOne({
  //       userId,
  //       'orders.order.id': orderId,
  //     });

  //     var items = document.orders.flatMap((orders) => orders.order.items);

  //     return items;
  //   }

  //   async updateItemId(userId, orderId, index, itemId) {
  //     var document = await this.itemStatus.findOne({
  //       userId,
  //       'orders.order.id': orderId,
  //     });

  //     var itemsId = document.orders
  //       .filter((orders) => orders.order.id == orderId)
  //       .map((order) => order.order.itemId)
  //       .flat();

  //     itemsId[index] = itemId;

  //     return await this.user.updateOne(
  //       { userId, 'orders.order.id': orderId },
  //       {
  //         $set: { 'orders.$.order.itemId': itemsId },
  //       },
  //     );
  //   }

  //   async updateItemStatus(userId, orderId, newItem) {
  //     var document = await this.itemStatus.findOne({
  //       userId,
  //       'orders.order.id': orderId,
  //     }).exec();

  //     var items = document.orders
  //       .filter((orders) => orders.order.id == orderId)
  //       .map((order) => order.order.items)
  //       .flat();

  //     var value = newItem.split(':::')[0];
  //     var item = items.find((elem) => elem.startsWith(value));
  //     var itemIndex = items.indexOf(item);

  //     items[itemIndex] = newItem;

  //     return await this.user.updateOne(
  //       { userId, 'orders.order.id': orderId },
  //       {
  //         $set: { 'orders.$.order.items': items },
  //       },
  //     );
  //   }

  async updateOrderStatus(userId, orderId, status) {
    return await this.user.updateOne(
      { userId, 'orders.order.id': orderId },
      {
        $set: { 'orders.$.order.orderStatus': status },
      },
    );
  }
}
