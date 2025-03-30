import { Exclude } from 'class-transformer';

@Exclude()
export class Params {
  readonly userId: string;
  readonly orderId: string;
}
