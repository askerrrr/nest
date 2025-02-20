import {Get, Bind, Body, Post, Controller} from '@nestjs/common'
import {BotApiService} from './bot-api.service'

@Controller('bot')
export class BotApiController {
    constructor(private readonly botApiService: BotApiService) {}

   @Post('api/users')
   @Bind(Body())
   async createUser(body){
    return this.botApiService.createUser(body)
   }

    @Post('api/order')
    @Bind(Body())
    async createOrder(body) {
        return this.botApiService.createOrder(body)
    }
}