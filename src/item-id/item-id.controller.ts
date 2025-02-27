import { ItemIdService } from './item-id.service';
import { Controller, Patch, Body } from '@nestjs/common';

@Controller('itemid')
export class ItemIdController {
  constructor(private readonly itemIdService: ItemIdService) {}
  @Patch()
  async updateItemId(@Body() body) {
    await this.itemIdService.updateItemId(
      body.userId,
      body.orderId,
      body.index,
      body.itemId,
    );
  }
}
