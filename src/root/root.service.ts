import { Injectable } from '@nestjs/common';

@Injectable()
export class RootService {
  getUsers() {
    return 'Users';
  }
}
