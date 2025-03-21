import { join } from 'path';
import { Response } from 'express';
import { Get, Res, Param, Delete, UseGuards, Controller } from '@nestjs/common';

import { ParamDto } from './order.dto';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/server/auth/auth.guard';

@Controller('orderinfo')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Get('api/:userId')
  async getUser(@Param() param: ParamDto) {
    var { userId } = param;

    var user = await this.orderService.getUser(userId);

    return user;
  }
  @UseGuards(AuthGuard)
  @Get('/api/order/:userId/:orderId')
  async getOrder(@Param() param: ParamDto) {
    var { userId, orderId } = param;

    var order = await this.orderService.getOrder(userId, orderId);

    return order;
  }
  @UseGuards(AuthGuard)
  @Get('/orders/order/:userId/:orderId')
  async getOrderFile(@Res() res: Response) {
    res.sendFile(join(__dirname, '../../src/client/html/userOrder.html'));
  }

  @UseGuards(AuthGuard)
  @Get('orders/:userId')
  async getOrderList(@Param() param: ParamDto, @Res() res: Response) {
    var { userId } = param;

    var activeOrders = await this.orderService.getActiveOrders(userId);
    var completedOrders = await this.orderService.getCompletedOrders(userId);

    var active = join(__dirname, '../../src/client/html/activeOrders.html');
    var completed = join(
      __dirname,
      '../../src/client/html/completedOrders.html',
    );
    var noOrders = join(__dirname, '../../src/client/html/noOrders.html');

    if (activeOrders?.length) {
      res.sendFile(active);
    } else if (!activeOrders?.length && completedOrders?.length) {
      res.sendFile(completed);
    } else if (!activeOrders?.length && !completedOrders?.length) {
      res.sendFile(noOrders);
    }
  }

  @UseGuards(AuthGuard)
  @Get('/api/completed/:userId')
  async getCompletedOrders(@Param() param: ParamDto): Promise<object> {
    var { userId } = param;

    var completedOrders = await this.orderService.getCompletedOrders(userId);

    return { userId, completedOrders };
  }

  @UseGuards(AuthGuard)
  @Delete('api/delete/:userId')
  async deleteUser(@Param() param: ParamDto): Promise<number> {
    var { userId } = param;

    var result = await this.orderService.deleteUser(userId);
    return result;
  }

  @UseGuards(AuthGuard)
  @Delete('api/delete/:userId/:orderId')
  async deleteOrder(@Param() param: ParamDto): Promise<number> {
    var { userId, orderId } = param;

    var result = await this.orderService.deleteUserOrder(userId, orderId);
    return result;
  }
}
