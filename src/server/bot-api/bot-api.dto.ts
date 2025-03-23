export class CreateUserDto {
  userId: string;
  firstName: string;
  userName: string;
}

export class CreateOrderDto {
  id: string;
  userId: string;
  firstName: string;
  userName: string;
  phone: string;
  date: string;
  type: string;
  orderStatus: string;
  file: {
    path: string;
    telegramApiFileUrl: string;
  };
  itemUrl?: string;
  description?: {
    size: string;
    qty: string | string[];
  };
}
