import { join } from 'path';
import { Response } from 'express';
import { plainToClass } from 'class-transformer';
import { Get, Res, Param, Delete, UseGuards, Controller } from '@nestjs/common';

import { ParamDto } from './dto/param.dto';
import { OrderDto } from './dto/order.dto';
import { AuthGuard } from '../auth/auth.guard';
import { OrderService } from './order.service';
import { OrderListDto } from './dto/orderList.dto';

@Controller('orderinfo')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Get('api/orderlist/:userId')
  async getUser(@Param() param: ParamDto): Promise<OrderListDto> {
    var { userId } = param;

    var user = await this.orderService.getUser(userId);

    var orderListDto = plainToClass(OrderListDto, user, {
      excludeExtraneousValues: true,
    });

    return orderListDto;
  }

  @UseGuards(AuthGuard)
  @Get('api/order/:userId/:orderId')
  async getOrder(@Param() param: ParamDto): Promise<OrderDto> {
    var { userId, orderId } = param;

    var order = await this.orderService.getOrder(userId, orderId);

    var orderDto = plainToClass(OrderDto, order, {
      excludeExtraneousValues: true,
    });

    return orderDto;
  }

  @UseGuards(AuthGuard)
  @Get('orders/order/:userId/:orderId')
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
  @Get('api/completed/:userId')
  async getCompletedOrders(@Param() param: ParamDto): Promise<OrderListDto> {
    var { userId } = param;

    var completedOrders = await this.orderService.getCompletedOrders(userId);

    var completedOrdersDto = plainToClass(
      OrderListDto,
      { userId, orders: completedOrders },
      {
        excludeExtraneousValues: true,
      },
    );

    return completedOrdersDto;
  }

  @UseGuards(AuthGuard)
  @Delete('api/delete/:userId')
  async deleteUser(
    @Param() param: ParamDto,
    @Res() res: Response,
  ): Promise<Response> {
    var { userId } = param;

    var result: boolean = await this.orderService.deleteUser(userId);
    return result ? res.sendStatus(200) : res.sendStatus(304);
  }

  @UseGuards(AuthGuard)
  @Delete('api/delete/:userId/:orderId')
  async deleteOrder(
    @Param() param: ParamDto,
    @Res() res: Response,
  ): Promise<Response> {
    var { userId, orderId } = param;

    var result = await this.orderService.deleteUserOrder(userId, orderId);
    return result ? res.sendStatus(200) : res.sendStatus(304);
  }
}
