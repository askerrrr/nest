import { IsString } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class Redirect {
  @Expose()
  @IsString()
  readonly redirect: boolean;
}
