import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { CreatePostDto } from './post.dto';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @MinLength(6)
  password: string;
  postIDList: Array<string>;
}

export class UserDetailDTO {
  name: string;
  email: string;
  postObjectList: Array<CreatePostDto>;
}
