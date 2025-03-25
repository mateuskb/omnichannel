import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AddressService } from '../address/address.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly addressService: AddressService,
  ) { }

  async createUser(name: string, email: string, zipCode: string) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ name }, { email }],
      },
    });

    if (existingUser) {
      throw new Error('Nome ou email já em uso');
    }

    const addressData = await this.addressService.getAddressByCep(zipCode);

    if (typeof addressData === 'string') {
      throw new Error('Invalid address data');
    }

    const address = await this.prisma.address.create({
      data: {
        zipCode,
        state: addressData.state,
        street: addressData.street,
        city: addressData.city,
      },
    });

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        address: {
          connect: { id: address.id },
        },
      },
    });

    return user;
  }

  async getUsers() {
    return this.prisma.user.findMany({
      include: {
        address: true
      },
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const { name, email, zipCode } = updateUserDto;

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ name }, { email }],
        NOT: {
          id,
        },
      },
    });

    if (existingUser) {
      throw new Error('Nome ou email já em uso');
    }

    const addressData = await this.addressService.getAddressByCep(zipCode);

    if (typeof addressData === 'string') {
      throw new Error('Invalid address data');
    }

    const updatedUser = await this.prisma.user.update({
      where: { 
        id: id,
      },
      data: {
        name,
        email,
        address: {
          update: {
            zipCode,
            state: addressData.state,
            street: addressData.street,
            city: addressData.city,
          },
        },
      },
    });

    return updatedUser;
  }
}