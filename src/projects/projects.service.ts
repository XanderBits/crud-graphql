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
    try{
      const findProject = await this.projectRepository.find({relations: { roles: true, developers: true}, 
                                                            where: {id: updateProjectInput.project}, 
                                                            })
      const findDev = await this.devRepository.find({relations: { roles: true}, 
                                                      where: {id: updateProjectInput.developer}, 
                                                    })                                                    
      if( findProject[0].developers.length !== 0 && findDev[0].id === findProject[0].developers[0].id) 
        throw new BadRequestException(`The developer ${findDev[0].name} 
                                      is already associated with this project`)
      let projectRoleId: number;
      let devRoleId: number;
      for(let id in findProject) projectRoleId = findProject[id].roles[0]['id']
      for(let id in findDev) devRoleId = findDev[id].roles[0]['id'];
      if( projectRoleId !== devRoleId) throw new BadRequestException(`Developer with id: ${devRoleId}  
                                                                    doesn't have the same role 
                                                                    as the project ${findProject[0].name}`)
      findProject[0].developers.push(findDev[0])
      await this.projectRepository.save(findProject)
      return findProject[0]
      
    }catch(error){ return error }
  }
}
