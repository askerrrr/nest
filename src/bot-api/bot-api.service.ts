import { Injectable } from '@nestjs/common';
import { UtilsForBotApi } from 'src/services/utilsForBotApi';
import { UserCollectionService } from 'src/database/user.collection.service';
import { ItemCollectionService } from 'src/database/item-status.collection.service';

@Injectable()
export class BotApiService {
  constructor(
    private utils: UtilsForBotApi,
    private userCollection: UserCollectionService,
    private itemCollection: ItemCollectionService,
  ) {}

  async createUser(body) {
    var existingDocument = this.userCollection.getUser({
      userId: body.userId,
    });

    if (!existingDocument) {
      await this.userCollection.createNewUser(body);
      await this.itemCollection.createItemStatus(body);
    }
  }

  async createOrder(body) {
    var userId = body.userId;
    var orderId = body.orderId;
    var fileUrl = body.telegramApiFileUrl;

    var existingDocument = await this.userCollection.getUser(userId);

    if (!existingDocument) {
      await this.userCollection.createNewUser(body);
      await this.itemCollection.createItemStatus(body);
    }

    await this.userCollection.addNewOrder(body);
    await this.utils.downloadAndSaveFile(userId, orderId, fileUrl, body);

    if (body.type == 'multiple') {
      var filePath = body.file.path;
      // var xlsxData = await this.utils.getDataFromXLSX(filePath)
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
}
