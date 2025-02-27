import { ItemIdService } from './item-id.service';
import { Controller, Patch, Body } from '@nestjs/common';

@Controller('itemid')
export class ItemIdController {
  constructor(private readonly itemIdService: ItemIdService) {}
  @Patch()
  async changeItemId(@Body() body) {
    await this.itemIdService.changeItemId(
      body.userId,
      body.orderId,
      body.index,
      body.itemId,
    );
  }
}
