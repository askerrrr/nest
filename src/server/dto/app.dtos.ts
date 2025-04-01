import { IsString } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class ParamDto {
  @Expose()
  @IsString()
  readonly userId: string;

  @Expose()
  @IsString()
  readonly orderId: string;
}
