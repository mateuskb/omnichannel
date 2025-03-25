import { HttpModule, HttpService } from '@nestjs/axios';

import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AddressModule } from '../address/address.module';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  imports: [HttpModule, AddressModule],
})
export class UserModule { }