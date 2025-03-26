import {
    Body,
    Controller,
    Post,
    Put,
    Param,
    Get,
    ParseIntPipe,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
  
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) { }
  
    @Post()
    async createUserWithAddress(@Body() createUserDto: CreateUserDto) {
      const { name, email, zipCode } = createUserDto;
      try {
        return await this.userService.createUser(name, email, zipCode);
      } catch (error) {
        throw new InternalServerErrorException(
          error.message || 'Erro ao criar usuário',
        );
      }
    }
  
    @Get('')
    async getUsers() {
      try {
        return await this.userService.getUsers();
      } catch (error) {
        throw new InternalServerErrorException(
          error.message || 'Erro ao buscar usuários',
        );
      }
    }
  
    @Put(':id')
    async updateUser(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      try {
        return await this.userService.updateUser(id, updateUserDto);
      } catch (error) {
        throw new InternalServerErrorException(
          error.message || 'Erro ao atualizar usuário',
        );
      }
    }
  }