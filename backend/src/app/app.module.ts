import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './address/address.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}