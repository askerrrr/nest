import { Type, Expose, Exclude } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

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
  readonly date: string;

  @Expose()
  @IsString()
  readonly orderStatus: string;
}

@Exclude()
class Orders {
  @Expose()
  @ValidateNested()
  @Type(() => Order)
  readonly order: Order;
}

@Exclude()
export class OrderListDto {
  @Expose()
  @IsString()
  readonly userId: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => Orders)
  readonly orders: Orders[];
}
