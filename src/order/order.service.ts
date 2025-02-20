import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {

  getUser(userId){}

  getOrder(orderId) {}

  getOrderFile(orderId){}

  getOrderList(userId) {}

  deleteUser(userId) {}

  deleteOrder(userId, orderId) {}


}
