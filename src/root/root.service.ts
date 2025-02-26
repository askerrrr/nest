import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RootService {
  constructor(private databaseService: DatabaseService) {}

  async getUsers() {
    return await this.databaseService.getAllUsers();
  }
}
