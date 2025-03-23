import { ItemIdDto } from './item-id.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ItemIdService } from './item-id.service';

import { Response } from 'express';
import { Res, Body, Patch, UseGuards, Controller } from '@nestjs/common';

@Controller('itemid')
export class ItemIdController {
  constructor(private readonly itemIdService: ItemIdService) {}

  @UseGuards(AuthGuard)
  @Patch()
  async updateItemId(
    @Body() body: ItemIdDto,
    @Res() res: Response,
  ): Promise<Response> {
    var { userId, orderId, index, itemId } = body;

    var successfullUpdate: boolean = await this.itemIdService.updateItemId(
      userId,
      orderId,
      index,
      itemId,
    );

    return successfullUpdate ? res.sendStatus(200) : res.sendStatus(304);
  }
}
