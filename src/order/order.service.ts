import { rm } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { UtilsForOrder } from 'src/services/utilsForOrder';
import { UserCollectionService } from 'src/database/user.collection.service';

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
    var document = await this.userCollection.getOrderData(orderId);
    var order = document?.orders.find((e) => e.order.id == orderId);
    return order;
  }

  async getOrderList(userId) {
    var document = await this.userCollection.getUser(userId);

    return document?.orders.length;
  }

  async deleteUser(userId) {
    await this.userCollection.deleteUser(userId);
    await rm('/var/www/userFiles/' + userId);
  }

  async deleteUserOrder(userId, orderId) {
    await this.userCollection.deleteOrder(userId, orderId);

    var filePath = await this.userCollection.findFilePath(userId, orderId);
    await rm(filePath!);
    await this.utils.deleteUserDataFromBot(userId, orderId);
  }
}
