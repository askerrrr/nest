export class UserDto {
  userId: string;
  firstName: string;
  userName: string;
  orders: [];
}

class File {
  path: string;
  telegramApiFileUrl: string;
}

export class OrderDto {
  id: string;
  date: string;
  type: string;
  phone: string;
  userId: string;
  userName: string;
  firstName: string;
  orderStatus: string;
  file: File;
}
