import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { OrderDto } from './dto/order.dto';
import { OrderListDto } from './dto/orderList.dto';
import { UtilsForOrder } from '../services/utilsForOrder';
import { UserCollectionService } from '../database/user.collection.service';

@Injectable()
export class OrderService {
  constructor(
    private utils: UtilsForOrder,
    private userCollection: UserCollectionService,
  ) {}

  async getUser(userId: string): Promise<OrderListDto> {
    var user = await this.userCollection.getUser(userId);

    var userDto = plainToClass(OrderListDto, user);

    return userDto;
  }

  async getOrder(userId: string, orderId: string): Promise<OrderDto> {
    var { orders }: any = await this.userCollection.getUser(userId);

    var { order } = orders.find((e) => e.order.id === orderId);

    return order;
  }

  async getActiveOrders(userId: string) {
    var { orders }: any = await this.userCollection.getUser(userId);

    var activeOrders = orders.filter(
      (e) => e.order.orderStatus !== 'order-is-completed:6',
    );

    return activeOrders;
  }

  async getCompletedOrders(userId: string) {
    var { orders }: any = await this.userCollection.getUser(userId);

    var completedOrders = orders.filter(
      (e) => e.order.orderStatus == 'order-is-completed:6',
    );

    return completedOrders;
  }

  async deleteUser(userId: string): Promise<boolean> {
    var isUserDeletedFromDB: boolean =
      await this.userCollection.deleteUser(userId);
    var isUserFolderDeleted: boolean =
      await this.utils.deleteUserFolder(userId);
    var successfullResponse: boolean =
      await this.utils.sendDeleteUserRequest(userId);

    return successfullResponse && isUserDeletedFromDB && isUserFolderDeleted;
  }

  async deleteUserOrder(userId: string, orderId: string): Promise<boolean> {
    await this.userCollection.deleteOrder(userId, orderId);

    var filePath: string = await this.userCollection.findFilePath(
      userId,
      orderId,
    );

    var isFileDeleted: boolean = await this.utils.deleteOrderFile(filePath);

    var successfullResponse: boolean = await this.utils.sendDeleteOrderRequest(
      userId,
      orderId,
    );

    var isDeletedFromDB: boolean = await this.userCollection.deleteOrder(
      userId,
      orderId,
    );

    return successfullResponse && isFileDeleted && isDeletedFromDB;
  }
}
