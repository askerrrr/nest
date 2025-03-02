import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from 'src/schemas/item.schema';

export class ItemCollectionService {
  constructor(
    @InjectModel(Item.name) private itemCollection: Model<ItemDocument>,
  ) {}

  async getItemId(userId, orderId) {
    var user = await this.itemCollection.findOne({ userId }).exec();

    var order = user?.orders.find((e) => e.order.id == orderId);
    var itemId: any[string] = order?.order.itemId;

    return itemId;
  }

  async getItems(userId, orderId) {
    var document = await this.itemCollection.findOne({ userId }).exec();
    var result = document?.orders.find((e) => e.order.id == orderId);

    var items: any[string] = result?.order.items;

    
    return items;
  }

  async updateItemId(userId, orderId, index, newItemId) {
    var itemsId = await this.getItemId(userId, orderId);

    itemsId[index] = newItemId;

    await this.itemCollection.updateOne(
      { userId, 'orders.order.id': orderId },
      {
        $set: { 'orders.$.order.itemId': itemsId },
      },
    );
  }

  async updateItemStatus(userId, orderId, items) {
    await this.itemCollection.updateOne(
      { userId, 'orders.order.id': orderId },
      {
        $set: { 'orders.$.order.items': items },
      },
    );
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

    var items = url.map((item, index) => {
      {
        if (item?.startsWith('http')) {
          return item.split('://')[1] + ':::' + 0;
        } else {
          return 'неопознанная ссылка' + index + ':::' + 0;
        }
      }
    });

    return await this.itemCollection.updateOne(
      { userId: userId, 'orders.order.id': orderId },
      {
        $set: { 'orders.$.order.items': items },
      },
    );
  }
}
