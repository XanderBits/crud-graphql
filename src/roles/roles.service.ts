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
      console.log(error)
      throw new BadRequestException(error.detail)
    }
}

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  /*update(id: number, updateRoleInput: UpdateRoleInput) {
    return `This action updates a #${id} role`;
  }*/

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
