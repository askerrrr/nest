export interface UserData {
  readonly userId: string;
  readonly firstName: string;
  readonly userName: string;
}

export interface OrderData {
  readonly id: string;
  readonly userId: string;
  readonly firstName: string;
  readonly userName: string;
  readonly date: string;
  readonly type: string;
  readonly orderStatus: string;
  readonly phone: string;
  readonly itemUrl?: string;
  readonly description?: {
    readonly qty: string;
    readonly size?: string;
  };
}
