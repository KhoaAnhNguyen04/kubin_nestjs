import { Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../entities/post.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly usersService: UsersService,
  ) {}

  async CreatePost(postTitle, postContent, postOwnerID) {
    const newPost = await this.postModel.create({
      postTitle,
      postContent,
      postOwnerID,
    });
    this.usersService.updateUserPost(postOwnerID, newPost._id);
    return newPost;
  }
}
