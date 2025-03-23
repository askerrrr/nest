import { Type, Expose, Exclude } from 'class-transformer';

class Description {
  @Expose()
  readonly qty: string;
  @Expose()
  readonly size?: string;
}

@Exclude()
export class OrderDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly userId: string;

  @Expose()
  readonly phone: string;

  @Expose()
  readonly date: string;

  @Expose()
  readonly type: 'single' | 'multiple';

  @Expose()
  readonly orderStatus: string;

  @Expose()
  readonly itemUrl?: string;

  @Expose()
  @Type(() => Description)
  readonly description?: Description;
}
