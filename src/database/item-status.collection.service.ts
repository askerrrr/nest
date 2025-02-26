import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from 'src/schemas/item.schema';

export class ItemCollectionService {
  constructor(
    @InjectModel(Item.name) private item: Model<ItemDocument>,
  ) {}

  async getItemId(userId, orderId) {
    var user = await this.item
      .findOne({
        userId,
        'orders.order.id': orderId,
      })
      .exec();

    var itemId = user?.orders.map((order) => order.order.itemId).flat();

    return itemId;
  }

  async getItemStatus(userId, orderId) {
    var document = await this.item
      .findOne({
        userId,
        'orders.order.id': orderId,
      })
      .exec();

    var items = document?.orders.flatMap((orders) => orders.order.items);

    return items;
  }

  async updateItemId(userId, orderId, index, itemId) {
    var document = await this.item.findOne({
      userId,
      'orders.order.id': orderId,
    });

    var itemsId = document?.orders
      .filter((orders) => orders.order.id == orderId)
      .map((order) => order.order.itemId)
      .flat();

    itemsId[index] = itemId;

    return await this.item.updateOne(
      { userId, 'orders.order.id': orderId },
      {
        $set: { 'orders.$.order.itemId': itemsId },
      },
    );
  }

  async updateItemStatus(userId, orderId, newItem) {
    var document = await this.item
      .findOne({
        userId,
        'orders.order.id': orderId,
      })
      .exec();

    var items = document?.orders
      .filter((orders) => orders.order.id == orderId)
      .map((order) => order.order.items)
      .flat();

    var value = newItem.split(':::')[0];
    var item = items.find((elem) => elem.startsWith(value));
    var itemIndex = items.indexOf(item);

    items[itemIndex] = newItem;

    return await this.item.updateOne(
      { userId, 'orders.order.id': orderId },
      {
        $set: { 'orders.$.order.items': items },
      },
    );
  }
}
