import { ItemIdDto } from './item-id.dto';
import { ItemIdService } from './item-id.service';

import { Controller, Patch, Body } from '@nestjs/common';

@Controller('itemid')
export class ItemIdController {
  constructor(private readonly itemIdService: ItemIdService) {}
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
