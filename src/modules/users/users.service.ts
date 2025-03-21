import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.schema';
import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async isUserIdExist(userId: string) {
    let user = await this.userModel.findById(userId);
    return user ? true : false;
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
  async createUser(name, email, password): Promise<Boolean> {
    //return true if created, else return false

    //find existing user
    let user = await this.userModel.find({ email });
    if (user) return false;
    this.userModel.create({ name, email, password });
    return true;
  }

  async checkPostUserOwner(userId, postId): Promise<Boolean> {
    let user = await this.userModel.findById(userId);
    if (!user) return false;
    return user.postIDList.includes(postId);
  }
}
