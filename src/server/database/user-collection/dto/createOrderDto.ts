class File {
  readonly path: string;
  readonly telegramApiFileUrl: string;
}

class Description {
  readonly size?: string;
  readonly qty: string;
}

export class CreateOrderDto {
  readonly id: string;
  readonly userId: string;
  readonly firstName: string;
  readonly userName: string;
  readonly phone: string;
  readonly date: string;
  readonly type: string;
  readonly orderStatus: string;
  readonly itemUrl?: string;
  readonly file: File;
  readonly description?: Description;
}
