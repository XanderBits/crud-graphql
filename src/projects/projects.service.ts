import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { In, Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}
  async create(createProjectInput: CreateProjectInput) {
    try {
     let { roles = [], ...createProjectDetails} = createProjectInput
      const project = this.projectRepository.create(createProjectDetails);
      const findRoleIds = await this.roleRepository.findBy({ id: In(roles) });
      project.roles = findRoleIds;
      await this.projectRepository.save( project );
      return project; 

    }catch(error){
      throw new BadRequestException(error.detail)
    }
  }
  findAll() {
    return `This action returns all projects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }
}
