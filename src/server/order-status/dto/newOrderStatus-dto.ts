import { IsString } from 'class-validator';

export class NewOrderStatusDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly orderId: string;

  @IsString()
  readonly orderStatus: string;
}
