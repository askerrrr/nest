import {Get, Bind, Param, Controller} from '@nestjs/common'
import {DownloadFileService} from './download-file/download-file.service.ts'

@Controller('download')
export class DownloadFileController {
    constructor(private readonly downloadFileService: DownloadFileService){}

@Get(':userId/:orderId')
@Bind(Param())
async downloadFile(param){
return this.downloadFileService.downloadFile(param.userId, param.orderId)
  }
}