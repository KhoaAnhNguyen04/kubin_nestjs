import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  postContent: string;

  @IsNotEmpty()
  postOwner: string;
}
export class UpdatePostDto {
  title?: string;

  postContent?: string;
  @IsNotEmpty()
  postID: string;

  @IsNotEmpty()
  postOwner: string;
}
