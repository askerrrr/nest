import { rm } from 'fs/promises';
import { Injectable } from '@nestjs/common';

import { UtilsForOrder } from 'src/server/services/utilsForOrder';
import { UserCollectionService } from 'src/server/database/user.collection.service';

@Injectable()
export class OrderService {
  constructor(
    private utils: UtilsForOrder,
    private userCollection: UserCollectionService,
  ) {}
  async getUserData(userId) {
    return await this.userCollection.getUser(userId);
  }

  async getOrderData(orderId) {
    var { orders }: any = await this.userCollection.getOrderData(orderId);
    var order = orders.find((e) => e.order.id == orderId);
    return order;
  }

  async getOrderList(userId) {
    var { orders }: any = await this.userCollection.getUser(userId);

    return orders.length;
  }

  async getActiveOrders(userId) {
    var activeOrders = await this.userCollection.getActiveOrders(userId);

    return activeOrders;
  }

  async getCompletedOrders(userId) {
    var completedOrders = await this.userCollection.getCompletedOrders(userId);

    return completedOrders;
  }
  async deleteUser(userId) {
    await this.userCollection.deleteUser(userId);
    await rm('/var/www/userFiles/' + userId);
  }

  async deleteUserOrder(userId, orderId) {
    await this.userCollection.deleteOrder(userId, orderId);

    var filePath = await this.userCollection.findFilePath(userId, orderId);
    await rm(filePath);
    await this.utils.deleteUserDataFromBot(userId, orderId);
  }
}
