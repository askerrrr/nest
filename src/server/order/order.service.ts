import { Injectable } from '@nestjs/common';

import { UtilsForOrder } from 'src/server/services/utilsForOrder';
import { UserCollectionService } from 'src/server/database/user.collection.service';

@Injectable()
export class OrderService {
  constructor(
    private utils: UtilsForOrder,
    private userCollection: UserCollectionService,
  ) {}
  async getUser(userId: string) {
    return await this.userCollection.getUser(userId);
  }

  async getOrder(userId: string, orderId: string) {
    var { orders }: any = await this.userCollection.getUser(userId);

    var { order } = orders.find((e) => e.order.id === orderId);

    return order;
  }

  async getActiveOrders(userId: string) {
    var { orders }: any = await this.getUser(userId);

    var activeOrders = orders.filter(
      (e) => e.order.orderStatus !== 'order-is-completed:6',
    );

    return activeOrders;
  }

  async getCompletedOrders(userId: string) {
    var { orders }: any = await this.getUser(userId);

    var completedOrders = orders.filter(
      (e) => e.order.orderStatus == 'order-is-completed:6',
    );

    return completedOrders;
  }

  async deleteUser(userId: string): Promise<boolean> {
    var isUserDeletedFromDB = await this.userCollection.deleteUser(userId);
    var isUserFolderDeleted = await this.utils.deleteUserFolder(userId);
    var successfullResponse = await this.utils.sendDeleteUserRequest(userId);

    return successfullResponse && isUserDeletedFromDB && isUserFolderDeleted;
  }

  async deleteUserOrder(userId: string, orderId: string): Promise<boolean> {
    await this.userCollection.deleteOrder(userId, orderId);

    var filePath = await this.userCollection.findFilePath(userId, orderId);

    var isFileDeleted = await this.utils.deleteOrderFile(filePath);

    var successfullResponse = await this.utils.sendDeleteOrderRequest(
      userId,
      orderId,
    );

    var isDeletedFromDB = await this.userCollection.deleteOrder(
      userId,
      orderId,
    );

    return successfullResponse && isFileDeleted && isDeletedFromDB;
  }
}
