import { Injectable } from '@nestjs/common';

import { ItemStatusService } from '../item-status/item-status.service';
import { UserCollectionService } from 'src/server/database/user.collection.service';

@Injectable()
export class OrderStatusService {
  constructor(
    private userCollection: UserCollectionService,
    private itemStatusService: ItemStatusService,
  ) {}
  async getOrderStatus(userId: string, orderId: string): Promise<object> {
    var orderStatus: string = await this.userCollection.getCurrentOrderStatus(
      userId,
      orderId,
    );

    return { orderStatus };
  }

  async changeOrderStatus(
    userId: string,
    orderId: string,
    status: string,
  ): Promise<boolean> {
    var successfullResponse: boolean =
      await this.itemStatusService.sendOrderStatus(userId, orderId, status);

    var succesfullUpdate: boolean = await this.userCollection.updateOrderStatus(
      userId,
      orderId,
      status,
    );

    return successfullResponse && succesfullUpdate;
  }
}
