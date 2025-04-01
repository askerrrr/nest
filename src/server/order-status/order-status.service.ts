import { Injectable } from '@nestjs/common';

import { ItemStatusService } from '../item-status/item-status.service';
import { UserCollectionService } from 'src/server/database/user-collection/user.collection.service';

import { NewOrderStatusDto } from './dto/newOrderStatus-dto';

@Injectable()
export class OrderStatusService {
  constructor(
    private userCollection: UserCollectionService,
    private itemStatusService: ItemStatusService,
  ) {}
  async getOrderStatus(userId: string, orderId: string): Promise<string> {
    return await this.userCollection.getOrderStatus(userId, orderId);
  }

  async changeOrderStatus({
    userId,
    orderId,
    orderStatus,
  }: NewOrderStatusDto): Promise<boolean> {
    var successfullResponse = await this.itemStatusService.sendOrderStatus(
      userId,
      orderId,
      orderStatus,
    );

    var succesfullUpdate = await this.userCollection.updateOrderStatus(
      userId,
      orderId,
      orderStatus,
    );

    return successfullResponse && succesfullUpdate;
  }
}
