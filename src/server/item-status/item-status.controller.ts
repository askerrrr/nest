import { ItemStatusService } from './item-status.service';
import { Get, Param, Body, Patch, Controller } from '@nestjs/common';

@Controller('itemstatus')
export class ItemStatusController {
  constructor(private readonly itemStatusService: ItemStatusService) {}

  @Patch()
  async changeItemStatus(@Body() body) {
    var { userId, orderId, item } = body;

    return this.itemStatusService.changeItemStatus(userId, orderId, item);
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
