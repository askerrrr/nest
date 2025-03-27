import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from '../schemas/admin.schema';

@Injectable()
export class AdminCollectionService {
  constructor(@InjectModel(Admin.name) private admin: Model<AdminDocument>) {}

  async getAdminData(): Promise<object> {
    var data = await this.admin.findOne();

    return { hashedLogin: data?.login, hashedPasswd: data?.passwd };
  }
}
