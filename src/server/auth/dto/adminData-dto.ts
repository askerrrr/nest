import { IsString } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class AdminData {
  @Expose()
  @IsString()
  readonly hashedLogin: string;

  @Expose()
  @IsString()
  readonly hashedPasswd: string;
}
