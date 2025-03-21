import { Body, Controller, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage } from 'src/global/globalEnum';

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

  @Put()
  async updatePost(@Body() body: UpdatePostDto): Promise<ResponseData<String>> {
    let updateStatus = await this.postService.UpdatePost(
      body.postID,
      body.title,
      body.postContent,
      body.postOwner,
    );
    return updateStatus
      ? new ResponseData<String>('Successful Update', 200, HttpMessage.SUCCESS)
      : new ResponseData<String>(
          'This user are not allowed to update this post',
          409,
          HttpMessage.ERROR,
        );
  }
}
