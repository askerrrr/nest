import { Get, Param, Patch, HttpCode, Controller } from '@nestjs/common';
import { ItemStatusService } from './item-status.service';

@Controller('item-status')
export class ItemStatusController {
  constructor(private readonly itemStatusService: ItemStatusService) {}

  @Patch()
  @HttpCode(200)
  async changeItemStatus() {
    return this.itemStatusService.getItemStatus();
  }


  @Get(':userid/:orderid')
  @Bind(Param())
  async getItemStatus(param){
    return this.itemStatusService(param)
  }
}
