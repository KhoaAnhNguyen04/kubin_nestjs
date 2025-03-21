import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UserDetailDTO } from './dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // for using function in Service

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<ResponseData<String>> {
    const user = await this.usersService.createUser(
      body.name,
      body.email,
      body.password,
    );
    return user
      ? new ResponseData<String>('Successful Created', 201, HttpMessage.SUCCESS)
      : new ResponseData<String>(
          'This email has been used',
          409,
          HttpMessage.ERROR,
        );
  }

  @Get('/detail')
  async getUserDetail(
    @Query('user_name') user_name: string,
  ): Promise<ResponseData<UserDetailDTO | null>> {
    const user = await this.usersService.getUserByName(user_name);
    return new ResponseData<UserDetailDTO | null>(
      user,
      200,
      HttpMessage.SUCCESS,
    );
  }

  @Put('/:user_id')
  updateUser(): string {
    return '';
  }
}
