import { ItemIdDto } from './item-id.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ItemIdService } from './item-id.service';

import { Body, Patch, UseGuards, Controller } from '@nestjs/common';

@Controller('itemid')
export class ItemIdController {
  constructor(private readonly itemIdService: ItemIdService) {}

  @UseGuards(AuthGuard)
  @Patch()
  async updateItemId(@Body() body: ItemIdDto): Promise<number> {
    var { userId, orderId, index, itemId } = body;

    var successfullUpdate: number = await this.itemIdService.updateItemId(
      userId,
      orderId,
      index,
      itemId,
    );

    return successfullUpdate;
  }
}
