import { Controller , Patch,Bind, Body} from '@nestjs/common';
import { ItemIdService } from './item-id.service';

@Controller('item-id')
export class ItemIdController {
  constructor(private readonly itemIdService: ItemIdService) {}
  @Patch()
  @Bind(Body())
  async changeItemId(body){
    
  }
}
