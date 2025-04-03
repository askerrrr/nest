import { Injectable } from '@nestjs/common';

import { OrdersDto } from './dto/ordersDto';
import { CreateUserDto } from './dto/createUser-dto';
import { CreateOrderDto } from './dto/createOrder-dto';

import { XlsxService } from '../xlsx/xlsx.service';
import { UtilsForBotApi } from 'src/server/services/utilsForBotApi';
import { UserCollectionService } from 'src/server/database/user-collection/user.collection.service';
import { ItemCollectionService } from 'src/server/database/item-collection/item-status.collection.service';

@Injectable()
export class BotApiService {
  constructor(
    private utils: UtilsForBotApi,
    private xlsxService: XlsxService,
    private userCollection: UserCollectionService,
    private itemCollection: ItemCollectionService,
  ) {}

  async createUser(userData: CreateUserDto): Promise<boolean> {
    var user = await this.userCollection.getUser(userData.userId);

    if (user) {
      return false;
    }

    var successfullCreateUser =
      await this.userCollection.createNewUser(userData);

    var successfullCreateItemCollection =
      await this.itemCollection.createItemStatus(userData);

    return successfullCreateUser && successfullCreateItemCollection;
  }

  async createOrder(order: CreateOrderDto): Promise<boolean> {
    var { type, userId, id, file } = order;

    var user = await this.userCollection.getUser(userId);

    if (!user) {
      var successfullCreateUser = await this.createUser(order);

      if (!successfullCreateUser) {
        return false;
      }
    }

    var successfullCreateOrder = await this.userCollection.createOrder(order);

    var { path, telegramApiFileUrl } = file;

    await this.utils.downloadOrderFile(telegramApiFileUrl, path);

    if (type == 'multiple') {
      var xlsxData = await this.xlsxService.getDataFromXLSX(path);

      var { url } = xlsxData;
      var successfullAddItems = await this.itemCollection.addItems(
        userId,
        id,
        url,
      );

      return successfullAddItems && successfullCreateOrder;
    }

    return successfullCreateOrder;
  }

  async getOrdersDetails(userId: string): Promise<OrdersDto> {
    var { orders }: any = await this.userCollection.getUser(userId);

    var orderDetails = await this.utils.getOrderDetailsForBot(orders);

    var activeOrders = orderDetails.filter(
      (e) => e.orderStatus !== 'order-is-completed:6',
    );

    var completedOrders = orderDetails.filter(
      (e) => e.orderStatus === 'order-is-completed:6',
    );

    return { activeOrders, completedOrders };
  }

  async validateAuthHeader(authHeader): Promise<boolean> {
    if (!authHeader) {
      return false;
    }

    var [type, token] = authHeader.split(' ');

    return type == 'Bearer' && token == process.env.bot_secret_key;
  }
}
