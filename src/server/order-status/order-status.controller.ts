import { Get, Body, Patch, Param, Controller, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { OrderStatusService } from './order-status.service';
import { OrderStatusDto, ParamDto } from './order-status.dto';

@Controller('status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  @UseGuards(AuthGuard)
  @Get('api/:userId/:orderId')
  async getOrderStatus(@Param() param: ParamDto) {
    var { userId, orderId } = param;

    var currentOrderStatus: object =
      await this.orderStatusService.getOrderStatus(userId, orderId);

    return currentOrderStatus;
  }

  @UseGuards(AuthGuard)
  @Patch('/')
  async changeOrderStatus(@Body() body: OrderStatusDto): Promise<number> {
    var { userId, orderId, orderStatus } = body;

    var responseStatus: number =
      await this.orderStatusService.changeOrderStatus(
        userId,
        orderId,
        orderStatus,
      );

    return responseStatus;
  }
}
