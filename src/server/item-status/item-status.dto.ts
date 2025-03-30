export class ItemStatusDto {
  readonly userId: string;
  readonly orderId: string;
  readonly item: string;
}

export class Params {
  readonly userId: string;
  readonly orderId: string;
}

export class OrderStatus {
  readonly orderStatus: string;
}
