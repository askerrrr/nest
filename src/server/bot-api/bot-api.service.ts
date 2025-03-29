import { Injectable } from '@nestjs/common';

import { XlsxService } from '../xlsx/xlsx.service';
import { UtilsForBotApi } from 'src/server/services/utilsForBotApi';
import { UserCollectionService } from 'src/server/database/user.collection.service';
import { ItemCollectionService } from 'src/server/database/item-status.collection.service';

@Injectable()
export class BotApiService {
  constructor(
    private utils: UtilsForBotApi,
    private xlsxService: XlsxService,
    private userCollection: UserCollectionService,
    private itemCollection: ItemCollectionService,
  ) {}

  async createUser(userData): Promise<boolean> {
    var user = await this.userCollection.getUser(userData.userId);

    if (user) {
      return false;
    } else {
      var successfullCreateUser =
        await this.userCollection.createNewUser(userData);

      var successfullCreateItemCollection =
        await this.itemCollection.createItemStatus(userData);

      return successfullCreateUser && successfullCreateItemCollection;
    }
  }

  async createOrder(order) {
    var { type, userId, id, file } = order;
    var { path, telegramApiFileUrl } = file;

    var user = await this.userCollection.getUser(userId);

    if (!user) {
      var successfullCreateUser: boolean = await this.createUser(order);

      if (!successfullCreateUser) {
        return false;
      }
    }

    var successfullAddNewOrder: boolean =
      await this.userCollection.addNewOrder(order);

    var successDownloadFile = await this.utils.downloadAndSaveFile(
      userId,
      id,
      telegramApiFileUrl,
      type,
    );

    if (type == 'multiple') {
      var xlsxData = await this.xlsxService.getDataFromXLSX(path);

      var url: string[] = xlsxData[0];
      var successfullAddItems = await this.itemCollection.addItems(
        userId,
        id,
        url,
      );

      return (
        successfullAddItems && successDownloadFile && successfullAddNewOrder
      );
    }

    return successDownloadFile && successfullAddNewOrder;
  }

  async getOrderDetails(userId) {
    var document = await this.userCollection.getUser(userId);
    var orderDetails = await this.utils.getOrderDetailsForBot(document);

    var activeOrders = orderDetails.filter(
      (e) => e.status !== 'order-is-completed:6',
    );
    var completedOrders = orderDetails.filter(
      (e) => e.status === 'order-is-completed:6',
    );

    return { activeOrders, completedOrders };
  }

  async validateAuthHeader(authHeader) {
    var [type, token] = authHeader.split(' ');

    return type == 'Bearer' && token == process.env.bot_secret_key;
  }
}
