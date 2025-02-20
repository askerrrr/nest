import { Get, Bind, Param, Delete, Controller } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('api/:userId')
  @Bind(Param())
  async getUser(param) {
    return this.orderService.getUser(param.userId);
  }


  @Get('api/order/:orderId')
  @Bind(Param())
  async getOrder(param) {
    return this.orderService.getOrder(param.orderId);
  }

  @Get("/orders/order/:orderId")
  @Bind(Param())
  async getOrderFile(param) {
    return this.orderService.getOrderFile(param.orderId)
  }

  @Get('orders/:userId')
  @Bind(Param())
  async getOrderList(param){
    return this.orderService.getOrderList(param.userId)
  }

  @Delete('api/delete/:userId')
  @Bind(Param())
  async deleteUser(param) {
    return this.orderService.deleteUser(param.userId)
  }

  @Delete('api/delete/:userId/:orderId')
  @Bind(Param())
  async deleteOrder(param) {
    return this.orderService.deleteOrder(param.userId, param.orderId)
  }

}
