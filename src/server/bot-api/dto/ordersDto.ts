import { Type, Expose, Exclude } from 'class-transformer';

@Exclude()
class Order {
  @Expose()
  readonly userId: string;

  @Expose()
  readonly id: string;

  @Expose()
  readonly orderStatus: string;

  @Expose()
  readonly date: string;

  @Expose()
  readonly phone: string;
}

@Exclude()
export class OrdersDto {
  @Expose()
  @Type(() => Order)
  readonly activeOrders: Order;

  @Expose()
  @Type(() => Order)
  readonly completedOrders: Order;
}
