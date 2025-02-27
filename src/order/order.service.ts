import { rm } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { UserCollectionService } from 'src/database/user.collection.service';

@Injectable()
export class OrderService {
  constructor(private userCollection: UserCollectionService) {}
  async getUserData(userId) {
    return await this.userCollection.getUser(userId);
  }

  async getOrderData(orderId) {
    var document = await this.userCollection.getOrderData(orderId);
    var order = document?.orders.find((e) => e.order.id == orderId);
    return order;
  }

  async getOrderList(userId) {
    var existingDocument = await this.userCollection.getUser(userId);

    return existingDocument?.orders.length;
  }

  async deleteUser(userId) {
    await this.userCollection.deleteUser(userId);
    await rm('/var/www/userFiles/' + userId);
  }

  async deleteUserOrder(userId, orderId) {
    await this.userCollection.deleteOrder(userId, orderId);

    var filePath = await this.userCollection.findFilePath(userId, orderId);
    await rm(filePath!);
    await this.deleteUserDataFromBot(userId, orderId);
  }

  async deleteUserDataFromBot(userId, orderId) {
    var botResponse = await fetch('env.bot_server_ip', {
      method: 'DELETE',
      body: JSON.stringify({ userId, orderId }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${'env.bearer_token'}`,
      },
    });

    if (!botResponse.ok) throw new Error(botResponse.statusText);
  }
}
