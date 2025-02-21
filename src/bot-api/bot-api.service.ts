import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class BotApiService {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}

  async createUser(body) {
    var existingDocument = this.user
      .findOne({
        userId: body.userId,
      })
      .exec();

    if (!existingDocument) {
      await this.user.insertOne(body);
      // this.itemStatus.insertOne({ userId: body.userId, orders: [] });
    }
  }

  createOrder(req) {}
}
