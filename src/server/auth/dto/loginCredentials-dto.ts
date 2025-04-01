import { IsString } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class LoginCredentials {
  @Expose()
  @IsString()
  readonly login: string;

  @Expose()
  @IsString()
  readonly passwd: string;
}
