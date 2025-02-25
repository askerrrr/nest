import { join } from 'path';
import { Response } from 'express';
import { OrderService } from './order.service';
import { Get, Res, Param, Delete, Controller } from '@nestjs/common';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('api/:userId')
  async getUser(@Param() param) {
    return this.orderService.getUser(param.userId);
  }

  @Get('api/order/:orderId')
  async getOrder(@Param() param) {
    return this.orderService.getOrder(param.orderId);
  }

  @Get('/orders/order/:orderId')
  async getOrderFile(@Param() param, @Res() res: Response) {
    return res.sendFile(
      join(__dirname, '..', '..', 'client', 'html', 'userOrder.html'),
    );
  }

  @Get('orders/:userId')
  async getOrderList(@Param() param, @Res() res: Response) {
    var userId = param.userId;
    var existingDocument; //= await collection.findOne({ userId });

    if (existingDocument.orders.length > 0)
      return res.sendFile(
        join(__dirname, '..', '..', 'client', 'html', 'ordersList.html'),
      );

    return res.sendFile(
      join(__dirname, '..', '..', 'client', 'html', 'noOrders.html'),
    );
  }

  @Delete('api/delete/:userId')
  async deleteUser(@Param() param) {
    return this.orderService.deleteUser(param.userId);
  }

  @Delete('api/delete/:userId/:orderId')
  async deleteOrder(@Param() param) {
    return this.orderService.deleteOrder(param.userId, param.orderId);
  }
}
