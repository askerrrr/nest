import { ItemStatusService } from './item-status.service';
import { Get, Param, Body, Patch, Controller } from '@nestjs/common';

@Controller('itemstatus')
export class ItemStatusController {
  constructor(private readonly itemStatusService: ItemStatusService) {}

  @Patch()
  async changeItemStatus(@Body() body) {
    return this.itemStatusService.changeItemStatus(
      body.userId,
      body.orderId,
      body.item,
    );
  }

  @Get('/:userId/:orderId')
  async getCurrentOrderStatus(@Param() param) {
    var currentOrderStatus = await this.itemStatusService.getCurrentOrderStatus(
      param.userId,
      param.orderId,
    );

    return { currentOrderStatus };
  }
}
