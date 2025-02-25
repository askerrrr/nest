import { Controller, Patch, Body } from '@nestjs/common';
import { ItemIdService } from './item-id.service';

@Controller('item-id')
export class ItemIdController {
  constructor(private readonly itemIdService: ItemIdService) {}
  @Patch()
  async changeItemId(@Body() body) {
    return;
  }
}
