import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class RootService {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}

  getUsers() {
    return this.user.find({}).exec();
  }
}
