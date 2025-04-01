import { Expose, Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ItemStatusDto {
  @Expose()
  @IsString()
  readonly userId: string;

  @Expose()
  @IsString()
  readonly orderId: string;

  @Expose()
  @IsString()
  readonly item: string;
}
