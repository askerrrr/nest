import { Response } from 'express';
import { Get, Param, Body, Patch, Res, Controller } from '@nestjs/common';

import { ItemStatusDto } from './item-status.dto';
import { ItemStatusService } from './item-status.service';

@Controller('purchasedstatus')
export class PurchasedStatusController {
  constructor(private readonly itemStatusService: ItemStatusService) {}

  @Patch()
  async changePurchasedtatus(@Body() body: ItemStatusDto, @Res() res: Response) {
    var { userId, orderId, item } = body;

    var responseStatus = await this.itemStatusService.changePurchasedStatus(
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
