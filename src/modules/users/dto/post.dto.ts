import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  postContent: string;

  @IsNotEmpty()
  postOwner: string;
}
