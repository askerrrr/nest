import { IsString, ValidateNested } from 'class-validator';
import { Expose, Exclude, Type } from 'class-transformer';

@Exclude()
class OrderDto {
  @Expose()
  @IsString()
  orderStatus?: string;
}

@Exclude()
class OrdersDto {
  @Expose()
  @ValidateNested()
  @Type(() => OrderDto)
  order?: OrderDto;
}

@Exclude()
export class UsersDto {
  @Expose()
  @IsString()
  userId: string;

  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  @IsString()
  userName: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => OrdersDto)
  orders: OrdersDto[];
}
