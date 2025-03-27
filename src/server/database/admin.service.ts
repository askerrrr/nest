import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from 'src/server/schemas/admin.schema';

@Injectable()
export class AdminCollectionService {
  constructor(@InjectModel(Admin.name) private service: Model<AdminDocument>) {}

  async getAuthData(): Promise<object> {
    var data = await this.service.find({}).exec();

    return {}; //{ hashedLogin: data?.login, hashedPasswd: data?.passwd };
  }
}
