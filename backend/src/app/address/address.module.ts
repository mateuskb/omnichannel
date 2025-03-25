import { AddressService } from './address.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule { }