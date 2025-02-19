import { Get, HttpCode, Controller } from '@nestjs/common';
import { ItemStatusService } from './item-status.service';

@Controller('item-status')
export class ItemStatusController {
  constructor(private readonly itemStatusService: ItemStatusService) {}

  @Get()
  @HttpCode(200)
  async getStatus() {
    return this.itemStatusService.getItemStatus();
  }
}
