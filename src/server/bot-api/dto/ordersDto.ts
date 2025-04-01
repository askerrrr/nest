import { IsString, ValidateNested } from 'class-validator';
import { Type, Expose, Exclude } from 'class-transformer';

@Exclude()
class Order {
  @Expose()
  @IsString()
  readonly userId: string;

  @Expose()
  @IsString()
  readonly id: string;

  @Expose()
  @IsString()
  readonly orderStatus: string;

  @Expose()
  @IsString()
  readonly date: string;

  @Expose()
  @IsString()
  readonly phone: string;
}

@Exclude()
export class OrdersDto {
  @Expose()
  @ValidateNested()
  @Type(() => Order)
  readonly activeOrders: Order;

  @Expose()
  @ValidateNested()
  @Type(() => Order)
  readonly completedOrders: Order;
}
