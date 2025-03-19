import { join } from 'path';
import { Response } from 'express';
import { Get, Res, Param, Delete, Controller } from '@nestjs/common';

import { OrderService } from './order.service';

@Controller('orderinfo')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('api/:userId')
  async getUser(@Param() param) {
    var { userId } = param;

    return await this.orderService.getUserData(userId);
  }

  @Get('api/order/:userId/:orderId')
  async getOrder(@Param() param) {
    var { orderId } = param;

    return this.orderService.getOrderData(orderId);
  }

  @Get('/orders/order/:userId/:orderId')
  async getOrderFile(@Res() res: Response) {
    return res.sendFile(
      join(__dirname, '../../src/client/html/userOrder.html'),
    );
  }

  @Get('orders/:userId')
  async getOrderList(@Param() param, @Res() res: Response) {
    var { userId } = param;

    var activeOrders = await this.orderService.getActiveOrders(userId);
    var completedOrders = await this.orderService.getCompletedOrders(userId);

    var active = join(__dirname, '../../src/client/html/activeOrders.html');
    var completed = join(
      __dirname,
      '../../src/client/html/completedOrders.html',
    );
    var noOrders = join(__dirname, '../../src/client/html/noOrders.html');

    if (
      activeOrders?.length &&
      (completedOrders?.length || !completedOrders?.length)
    ) {
      res.sendFile(active);
    } else if (!activeOrders?.length && completedOrders?.length) {
      res.sendFile(completed);
    } else if (!activeOrders?.length && !completedOrders?.length) {
      res.sendFile(noOrders);
    }
  }

  @Get('/api/completed/:userId')
  async getCompletedOrders(@Param() param) {
    var { userId } = param;

    var completedOrders = this.orderService.getCompletedOrders(userId);

    return { userId, completedOrders };
  }

  @Delete('api/delete/:userId')
  async deleteUser(@Param() param) {
    var { userId } = param;

    return await this.orderService.deleteUser(userId);
  }

  @Delete('api/delete/:userId/:orderId')
  async deleteOrder(@Param() param) {
    var { userId, orderId } = param;

    return await this.orderService.deleteUserOrder(userId, orderId);
  }
}
