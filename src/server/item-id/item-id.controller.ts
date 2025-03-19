import { ItemIdService } from './item-id.service';
import { Controller, Patch, Body } from '@nestjs/common';

@Controller('itemid')
export class ItemIdController {
  constructor(private readonly itemIdService: ItemIdService) {}
  @Patch()
  async updateItemId(@Body() body) {
    var { userId, orderId, index, itemId } = body;

    await this.itemIdService.updateItemId(userId, orderId, index, itemId);
  }
}
