import { Expose, Exclude } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

@Exclude()
class File {
  @Expose()
  @IsString()
  readonly path: string;

  @Expose()
  @IsString()
  readonly telegramApiFileUrl: string;
}

@Exclude()
class Description {
  @Expose()
  @IsString()
  readonly size?: string;

  @Expose()
  @IsString()
  readonly qty: string;
}

@Exclude()
export class CreateOrderDto {
  @Expose()
  @IsString()
  readonly id: string;

  @Expose()
  @IsString()
  readonly userId: string;

  @Expose()
  @IsString()
  readonly firstName: string;

  @Expose()
  @IsString()
  readonly userName: string;

  @Expose()
  @IsString()
  readonly phone: string;

  @Expose()
  @IsString()
  readonly date: string;

  @Expose()
  @IsString()
  readonly type: string;

  @Expose()
  @IsString()
  readonly orderStatus: string;

  @Expose()
  @IsString()
  readonly itemUrl?: string;

  @Expose()
  @ValidateNested()
  readonly file: File;

  @Expose()
  @ValidateNested()
  readonly description?: Description;
}
