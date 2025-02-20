import {Get, Bind, Param, Controller} from '@nestjs/common'
import { DownloadImgService } from './download-img.service'

@Controller('image')
export class DownloadImgController {
    constructor(private readonly downloadImgService: DownloadImgService) {}

   @Get()
   @Bind(Param())
   async downloadImg(param) {
    return this.downloadImgService.downloadImg(param.userId, param.orderId)
   }

}