import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from 'src/developers/entities/developer.entity';
import { Role } from 'src/roles/entities/role.entity';
import { In, Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Developer)
    private devRepository: Repository<Developer>
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
  async addDevToProject(updateProjectInput : UpdateProjectInput){
    const findProjectId = await this.projectRepository.find({relations: { roles: true}, where: {id: updateProjectInput.project}, select: { roles: true }})
    const findDevId = await this.devRepository.find({relations: { roles: true}, where: {id: updateProjectInput.developer}, select: { roles: true }})
    console.log(findProjectId, findDevId);
  }
  findAll() {
    return `This action returns all projects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }
}
