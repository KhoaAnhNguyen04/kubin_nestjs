import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '../dto/post.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post()
  @ApiOperation({
    description: 'abc',
    summary: 'dddd',
  })
  createPost(@Body() body: CreatePostDto) {
    return this.postService.CreatePost(
      body.title,
      body.postContent,
      body.postOwner,
    );
  }
}
