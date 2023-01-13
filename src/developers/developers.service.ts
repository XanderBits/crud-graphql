import { Injectable } from '@nestjs/common';
import { CreateDeveloperInput } from './dto/create-developer.input';

@Injectable()
export class DevelopersService {
  create(createDeveloperInput: CreateDeveloperInput) {
    return 'This action adds a new developer';
  }

  findAll() {
    return `This action returns all developers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} developer`;
  }
}
