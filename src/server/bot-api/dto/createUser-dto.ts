import { IsString } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class CreateUserDto {
  @Expose()
  @IsString()
  readonly userId: string;

  @Expose()
  @IsString()
  readonly firstName: string;

  @Expose()
  @IsString()
  readonly userName: string;
}
