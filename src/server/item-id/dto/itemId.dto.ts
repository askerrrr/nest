import { Expose, Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ItemIdDto {
  @Expose()
  @IsString()
  readonly userId: string;

  @Expose()
  @IsString()
  readonly orderId: string;

  @Expose()
  @IsString()
  readonly index: string;

  @Expose()
  @IsString()
  readonly itemId: string;
}
