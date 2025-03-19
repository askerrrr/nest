import { Response } from 'express';
import { ItemStatusService } from './item-status.service';
import { Get, Res, Param, Body, Patch, Controller } from '@nestjs/common';

@Controller('deliverystatus')
export class DeliveryStatusController {
  constructor(private readonly itemStatusService: ItemStatusService) {}

  @Patch()
  async changeDeliveryStatus(@Body() body, @Res() res: Response) {
    var { userId, orderId, item } = body;

    var responseStatus = await this.itemStatusService.changeDeliveredStatus(
      userId,
      orderId,
      item,
    );

    res.sendStatus(responseStatus);
  }

  @Get('/:userId/:orderId')
  async getCurrentOrderStatus(@Param() param) {
    var { userId, orderId } = param;

    var currentOrderStatus = await this.itemStatusService.getCurrentOrderStatus(
      userId,
      orderId,
    );

    return { currentOrderStatus };
  }
}
