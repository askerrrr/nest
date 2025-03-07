import { join } from 'path';
import { Response } from 'express';
import { OrderService } from './order.service';
import { Get, Res, Param, Delete, Controller } from '@nestjs/common';

@Controller('orderinfo')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('api/:userId')
  async getUser(@Param() param) {
    return await this.orderService.getUserData(param.userId);
  }

  @Get('api/order/:orderId')
  async getOrder(@Param() param) {
    return this.orderService.getOrderData(param.orderId);
  }

  @Get('/orders/order/:userId/:orderId')
  async getOrderFile(@Res() res: Response) {
    return res.sendFile(
      join(__dirname, '..', '..', 'client', 'html', 'userOrder.html'),
    );
  }

  @Get('orders/:userId')
  async getOrderList(@Param() param, @Res() res: Response) {
    var userId = param.userId;
    var orders = await this.orderService.getOrderList(userId);

    return orders
      ? res.sendFile(
          join(__dirname, '..', '..', 'client', 'html', 'ordersList.html'),
        )
      : res.sendFile(
          join(__dirname, '..', '..', 'client', 'html', 'noOrders.html'),
        );
  }

  @Delete('api/delete/:userId')
  async deleteUser(@Param() param) {
    return await this.orderService.deleteUser(param.userId);
  }

  @Delete('api/delete/:userId/:orderId')
  async deleteOrder(@Param() param) {
    return await this.orderService.deleteUserOrder(param.userId, param.orderId);
  }
}
