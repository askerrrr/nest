import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Item, ItemDocument } from 'src/server/schemas/item.schema';

export class ItemCollectionService {
  constructor(
    @InjectModel(Item.name) private itemCollection: Model<ItemDocument>,
  ) {}

  async getItemId(userId, orderId) {
    var { orders }: any = await this.itemCollection.findOne({ userId }).exec();
    var { order } = orders.find((e) => e.order.id == orderId);
    var { itemId } = order;

    return itemId;
  }

  async getItems(userId, orderId) {
    var { orders }: any = await this.itemCollection.findOne({ userId }).exec();
    var { order } = orders.find((e) => e.order.id == orderId);
    var { items } = order;

    return items;
  }

  async updateItemId(userId, orderId, itemIDs) {
    var result = await this.itemCollection.updateOne(
      { userId, 'orders.order.id': orderId },
      {
        $set: { 'orders.$.order.itemId': itemIDs },
      },
    );

    return result.modifiedCount;
  }

  async updateItemStatus(userId, orderId, items) {
    var result = await this.itemCollection.updateOne(
      { userId, 'orders.order.id': orderId },
      {
        $set: { 'orders.$.order.items': items },
      },
    );
    console.log('result: ', result);

    return result.modifiedCount;
  }

  async createItemStatus(user) {
    await this.itemCollection.insertOne({ userId: user.userId, orders: [] });
  }

  async addItems(userId, orderId, xlsxData) {
    var url = xlsxData[0];

    await this.itemCollection.updateOne(
      { userId: userId },
      {
        $push: { orders: { order: { id: orderId, items: [], itemId: [] } } },
      },
    );

    var items = url.map((e, i) =>
      e?.startsWith('http')
        ? e.split('://')[1] + ':::' + 0 + ':::' + 0
        : 'неопознанная ссылка' + i + ':::' + 0 + ':::' + 0,
    );

    var result = await this.itemCollection.updateOne(
      { userId: userId, 'orders.order.id': orderId },
      {
        $set: { 'orders.$.order.items': items },
      },
    );

    return result.modifiedCount;
  }
}
