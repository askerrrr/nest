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

    var user = await this.orderService.getUser(userId);

    return user;
  }

  @Get('/api/order/:userId/:orderId')
  async getOrder(@Param() param) {
    var { userId, orderId } = param;

    var order = await this.orderService.getOrder(userId, orderId);

    return order;
  }

  @Get('/orders/order/:userId/:orderId')
  async getOrderFile(@Res() res: Response) {
    res.sendFile(join(__dirname, '../../src/client/html/userOrder.html'));
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
  async getCompletedOrders(@Param() param): Promise<object> {
    var { userId } = param;

    var completedOrders = await this.orderService.getCompletedOrders(userId);

    return { userId, completedOrders };
  }

  @Delete('api/delete/:userId')
  async deleteUser(@Param() param): Promise<number> {
    var { userId } = param;

    var result = await this.orderService.deleteUser(userId);
    return result;
  }

  @Delete('api/delete/:userId/:orderId')
  async deleteOrder(@Param() param): Promise<number> {
    var { userId, orderId } = param;

    var result = await this.orderService.deleteUserOrder(userId, orderId);
    return result;
  }
}
