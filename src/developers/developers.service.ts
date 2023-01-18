import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { Role } from 'src/roles/entities/role.entity';
import { In, Repository } from 'typeorm';
import { CreateDeveloperInput } from './dto/create-developer.input';
import { Developer } from './entities/developer.entity';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(Developer)
    private readonly DevRepository: Repository<Developer>,
    @InjectRepository(Role)
    private readonly RoleRepository: Repository<Role>,
    @InjectRepository(Project)
    private readonly ProjectRepository: Repository<Project>,
  ) {}

  async create(CreateDeveloperInput: CreateDeveloperInput) {
    try{
      let { projects = [], roles = [], ...createDeveloperInput} = CreateDeveloperInput;
      const developer = this.DevRepository.create(createDeveloperInput);

      const findRoleIds = await this.RoleRepository.findBy({ id: In(roles) });
      developer.roles = findRoleIds;
      const findProjectIds = await this.ProjectRepository.findBy({ id: In(projects) });
      developer.projects = findProjectIds;
      
      await this.DevRepository.save( developer );
      return developer;
    }catch(error){
      throw new BadRequestException(error.detail)
    } 
  }

  findAll() {
    return `This action returns all developers`;
  }

  findByRoleAndProyect(id: number) {
    return `This action returns a #${id} developer`;
  }
}
