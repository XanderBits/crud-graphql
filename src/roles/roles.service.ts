import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleInput } from './dto/create-role.input';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
      private readonly roleRepository: Repository<Role>,
  ) {}
  async create(createRoleInput: CreateRoleInput) {
    try {
      const role = this.roleRepository.create(createRoleInput);
      await this.roleRepository.save( role );
      return role;
    }catch(error){
      throw new BadRequestException(error.detail)
    }
  }
}
