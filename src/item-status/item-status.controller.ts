import { ItemStatusService } from './item-status.service';
import { Get, Param, Body, Patch, HttpCode, Controller } from '@nestjs/common';

@Controller('item-status')
export class ItemStatusController {
  constructor(private readonly itemStatusService: ItemStatusService) {}

  @Patch()
  @HttpCode(200)
  async changeItemStatus(@Body() body) {
    return this.itemStatusService.updateItemStatus(
      body.userId,
      body.orderId,
      body.item,
    );
  }

  @Get(':userId/:orderId')
  async getItemStatus(@Param() param) {
    return this.itemStatusService.getItemStatus(param.userid, param.orderId);
  }
}
