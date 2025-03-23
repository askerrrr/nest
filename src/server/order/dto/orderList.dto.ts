import { Type, Expose, Exclude } from 'class-transformer';

@Exclude()
class Order {
  @Expose()
  readonly id: string;

  @Expose()
  readonly date: string;

  @Expose()
  readonly orderStatus: string;
}

@Exclude()
class Orders {
  @Expose()
  @Type(() => Order)
  readonly order: Order;
}

@Exclude()
export class OrderListDto {
  @Expose()
  readonly userId: string;

  @Expose()
  @Type(() => Orders)
  readonly orders: Orders[];
}
