import { Injectable } from '@nestjs/common';

import { UserCollectionService } from 'src/server/database/user.collection.service';

@Injectable()
export class RootService {
  constructor(private userCollection: UserCollectionService) {}

  async getUsers() {
    var users = await this.userCollection.getUsers();
    return users;
  }
}
