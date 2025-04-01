import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { AdminData } from './dto/admin-data';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from '../../schemas/admin.schema';

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
