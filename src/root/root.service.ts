import { Injectable } from '@nestjs/common';
import { UserCollectionService } from 'src/database/user.collection.service';

@Injectable()
export class RootService {
  constructor(private userCollection: UserCollectionService) {}

  async getUsers() {
    return await this.userCollection.getAllUsers();
  }
}
