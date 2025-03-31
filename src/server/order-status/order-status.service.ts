import { Injectable } from '@nestjs/common';

import { ItemStatusService } from '../item-status/item-status.service';
import { UserCollectionService } from 'src/server/database/user.collection.service';

@Injectable()
export class OrderStatusService {
  constructor(
    private userCollection: UserCollectionService,
    private itemStatusService: ItemStatusService,
  ) {}
  async getOrderStatus(userId: string, orderId: string): Promise<string> {
    return await this.userCollection.getCurrentOrderStatus(userId, orderId);
  }

  async changeOrderStatus(
    userId: string,
    orderId: string,
    status: string,
  ): Promise<boolean> {
    var successfullResponse = await this.itemStatusService.sendOrderStatus(
      userId,
      orderId,
      status,
    );

    var succesfullUpdate = await this.userCollection.updateOrderStatus(
      userId,
      orderId,
      status,
    );

    return successfullResponse && succesfullUpdate;
  }
}
