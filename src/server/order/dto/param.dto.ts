import { Exclude } from 'class-transformer';

@Exclude()
export class ParamDto {
  readonly userId: string;
  readonly orderId?: string;
}
