import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

interface AddressResponse {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

@Injectable()
export class AddressService {
  constructor(private readonly httpService: HttpService) { }

  async getAddressByCep(cep: string): Promise<AddressResponse | string> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
      const response = await lastValueFrom(
        this.httpService.get<AddressResponse>(url),
      );
      return response.data;
    } catch {
      return 'Erro ao buscar o endereço';
    }
  }
}