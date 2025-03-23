import { Expose, Exclude, Type } from 'class-transformer';

@Exclude()
class OrderDto {
  @Expose()
  orderStatus?: string;
}

@Exclude()
class OrdersDto {
  @Expose()
  @Type(() => OrderDto)
  order?: OrderDto;
}

@Exclude()
export class UsersDto {
  @Expose()
  userId: string;

  @Expose()
  firstName: string;

  @Expose()
  userName: string;

  @Expose()
  @Type(() => OrdersDto)
  orders: OrdersDto[];
}
