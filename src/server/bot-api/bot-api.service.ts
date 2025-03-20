import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UtilsForBotApi } from 'src/server/services/utilsForBotApi';
import { UserCollectionService } from 'src/server/database/user.collection.service';
import { ItemCollectionService } from 'src/server/database/item-status.collection.service';

@Injectable()
export class BotApiService {
  constructor(
    private utils: UtilsForBotApi,
    private userCollection: UserCollectionService,
    private itemCollection: ItemCollectionService,
  ) {}

  async createUser(user) {
    var existingDocument = this.userCollection.getUser({
      userId: user.userId,
    });

    if (!existingDocument) {
      await this.userCollection.createNewUser(user);
      await this.itemCollection.createItemStatus(user);
    }
  }

  async createOrder(order) {
    var { type, userId, orderId, file } = order;
    var { path, telegramApiFileUrl } = file;

    var existingDocument = await this.userCollection.getUser(userId);

    if (!existingDocument) {
      await this.userCollection.createNewUser(order);
      await this.itemCollection.createItemStatus(order);
    }

    await this.userCollection.addNewOrder(order);
    await this.utils.downloadAndSaveFile(
      userId,
      orderId,
      telegramApiFileUrl,
      order,
    );

    if (type == 'multiple') {
      // var xlsxData = await this.utils.getDataFromXLSX(path)
      // await this.itemCollection.addItems(userId, orderId, xlsxData);
    }
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
    if (!authHeader) {
      throw new UnauthorizedException();
    }

    var [authType, token] = authHeader.split(' ');

    if (authType !== 'Bearer' && token !== 'env.auth_token') {
      throw new UnauthorizedException();
    }

    return true;
  }
}
