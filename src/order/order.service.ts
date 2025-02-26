import { rm } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/user.collection.service';

@Injectable()
export class OrderService {
  constructor(private databaseService: DatabaseService) {}
  async getUserData(userId) {
    return await this.databaseService.getUser(userId);
  }

  async getOrderData(orderId) {
    var document = await this.databaseService.getOrderData(orderId);
    var order = document?.orders.find((e) => e.order.id == orderId);
    return order;
  }

  async getOrderList(userId) {
    var existingDocument = await this.databaseService.getUser(userId);

    return existingDocument?.orders.length;
  }

  async deleteUser(userId) {
    await this.databaseService.deleteUser(userId);
    await rm('/var/www/userFiles/' + userId);
  }

  async deleteUserOrder(userId, orderId) {
    await this.databaseService.deleteOrder(userId, orderId);

    var filePath = await this.findFilePath(userId, orderId);
    await rm(filePath);
    await this.deleteUserDataFromBot(userId, orderId);
  }

  async findFilePath(userId, orderId) {
    var document = await this.databaseService.getUserData(userId, orderId);

    var filePath = document?.orders.filter((e) => e.order.id == orderId)[0]
      .order.file.path;

    return filePath + '';
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

    if (!botResponse.ok) throw new Error(`${botResponse.statusText}`);
  }
}
