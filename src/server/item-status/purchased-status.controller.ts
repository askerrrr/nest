import { Response } from 'express';
import {
  Get,
  Param,
  Body,
  Patch,
  Res,
  UseGuards,
  Controller,
} from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { ItemStatusService } from './item-status.service';
import { ItemStatusDto, ParamDto } from './item-status.dto';

@Controller('purchasedstatus')
export class PurchasedStatusController {
  constructor(private readonly itemStatusService: ItemStatusService) {}

  @UseGuards(AuthGuard)
  @Patch()
  async changePurchasedtatus(
    @Res() res: Response,
    @Body() body: ItemStatusDto,
  ): Promise<Response> {
    var { userId, orderId, item } = body;

    var successfullUpdate: boolean =
      await this.itemStatusService.changePurchasedStatus(userId, orderId, item);

    return successfullUpdate ? res.sendStatus(200) : res.sendStatus(304);
  }

  @UseGuards(AuthGuard)
  @Get('/:userId/:orderId')
  async getCurrentOrderStatus(@Param() param: ParamDto): Promise<object> {
    var { userId, orderId } = param;

    var currentOrderStatus: string =
      await this.itemStatusService.getCurrentOrderStatus(userId, orderId);

    return { currentOrderStatus };
  }
}
