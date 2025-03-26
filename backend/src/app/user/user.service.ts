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

    let addressPayload = {
      zipCode,
      state: addressData.estado,
      street: addressData.logradouro,
      city: addressData.localidade,
    };

    const address = await this.prisma.address.create({
      data: addressPayload,
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
            state: addressData.estado,
            street: addressData.logradouro,
            city: addressData.localidade,
          },
        },
      },
    });

    return updatedUser;
  }
}