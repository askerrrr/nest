import { IsString, ValidateNested } from 'class-validator';
import { Type, Expose, Exclude } from 'class-transformer';

class Description {
  @Expose()
  @IsString()
  readonly qty: string;

  @Expose()
  @IsString()
  readonly size?: string;
}

@Exclude()
export class OrderDto {
  @Expose()
  @IsString()
  readonly id: string;

  @Expose()
  @IsString()
  readonly userId: string;

  @Expose()
  @IsString()
  readonly phone: string;

  @Expose()
  @IsString()
  readonly date: string;

  @Expose()
  @IsString()
  readonly type: 'single' | 'multiple';

  @Expose()
  @IsString()
  readonly orderStatus: string;

  @Expose()
  @IsString()
  readonly itemUrl?: string;

  @Expose()
  @ValidateNested()
  @Type(() => Description)
  readonly description?: Description;
}
