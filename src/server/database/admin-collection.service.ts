import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminData } from './admin-collection.dto';
import { Admin, AdminDocument } from '../schemas/admin.schema';

@Injectable()
export class AdminCollectionService {
  constructor(
    @InjectModel(Admin.name, 'admin') private admin: Model<AdminDocument>,
  ) {}

  async getAdminData(): Promise<AdminData> {
    var admin = await this.admin.findOne().exec();

    if (!admin) {
      throw new Error('Auth data not found');
    }

    return { hashedLogin: admin.login, hashedPasswd: admin.passwd };
  }
}
