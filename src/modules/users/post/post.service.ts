import { Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../entities/post.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users.service';
import { CreatePostDto } from '../dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly usersService: UsersService,
  ) {}

  async CreatePost(postTitle, postContent, postOwnerID): Promise<boolean> {
    //check user exist
    if (!(await this.usersService.isUserIdExist(postOwnerID))) return false;
    //handle prototype
    const newPost = await this.postModel.create({
      postTitle,
      postContent,
      postOwnerID,
    });
    await this.usersService.updateUserPost(postOwnerID, newPost._id);
    return true;
  }

  async UpdatePost(
    postId,
    postTitle,
    postContent,
    postOwnerID,
  ): Promise<Boolean> {
    //check postOwnerID content
    if (
      (await this.usersService.checkPostUserOwner(postOwnerID, postId)) == false
    )
      return false;
    const updatePost = await this.postModel.findByIdAndUpdate(
      postId,
      { postContent, postTitle },
      { new: true, upsert: false },
    );
    return !!updatePost;
  }
}
