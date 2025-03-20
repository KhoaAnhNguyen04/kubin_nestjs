import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UsersModule } from '../users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../entities/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    UsersModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
