import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.schema';
import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async getUserWithPosts(userId: string) {
    return this.userModel.findById(userId).populate('postIDList').exec();
  }
  async updateUserPost(userId: string, postId: unknown) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { postIDList: postId } },
      { new: true, upsert: false },
    );
  }
  async getUserByName(name) {
    const user = await this.userModel
      .aggregate([
        {
          $match: { name: name },
        },
        {
          $lookup: {
            from: 'posts',
            localField: 'postIDList',
            foreignField: '_id',
            as: 'postObjectList',
          },
        },
        {
          $project: {
            name: 1,
            email: 1,
            postObjectList: 1,
          },
        },
      ])
      .exec();
    return user.length > 0 ? user : null;
  }
  async getAllUsers() {
    return this.userModel.find();
  }
  async createUser(name, email, password) {
    return this.userModel.create({ name, email, password });
  }
}
