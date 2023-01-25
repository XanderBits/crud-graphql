import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from 'src/developers/entities/developer.entity';
import { Role } from 'src/roles/entities/role.entity';
import { In, Repository } from 'typeorm';
import { ListProjectsArgs } from './dto/args/list-project.args';
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

  async create(createProjectInput: CreateProjectInput): Promise<Project>{
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

  async addDevToProject(updateProjectInput : UpdateProjectInput): Promise<Project[]>{
    try{
      
      const findProject = await this.projectRepository.find({relations: { roles: true, developers: true}, 
                                                            where: {id: updateProjectInput.project}, 
                                                            })
                                                            console.log(findProject)
      const findDev = await this.devRepository.find({relations: { roles: true}, 
                                                      where: {id: updateProjectInput.developer}, 
                                                    })    
      //Checks if the project has developers, and if the developer entered by the user is not already associated with the project.                                                
      if( findProject[0].developers.length !== 0 && findDev[0].id === findProject[0].developers[0].id) 
        throw new BadRequestException(`The developer ${findDev[0].name} 
                                      is already associated with this project`)
                                      
      const projectRoleId: number = findProject[0].roles[0]['id']
      const devRoleId: number = findDev[0].roles[0]['id']
     if( projectRoleId !== devRoleId) throw new BadRequestException(`Developer with id: ${devRoleId}  
                                                                    doesn't have the same role 
                                                                    as the project ${findProject[0].name}`)
      findProject[0].developers.push(findDev[0])
      await this.projectRepository.save(findProject)
      return findProject

    }catch(error){ return error }
  }

  async listProjects (listProjectArgs: ListProjectsArgs) : Promise<Project[]>{
    try{
      // If Args Object is not empty
      if( Object.keys(listProjectArgs).length !== 0 ){
        if(listProjectArgs.hasOwnProperty('roles') && listProjectArgs.hasOwnProperty('status')){
          const projects = await this.projectRepository.find({
            relations: {roles: true},
            where: {
              roles: {
                id: listProjectArgs.roles
              },
              status: listProjectArgs.status
            },
          })
        return projects;
        }
      // List All projects that have the same role 
      if(listProjectArgs.hasOwnProperty('roles')){
        const projectsByRole = await this.projectRepository.find({ relations: { roles: true }, where: { roles: { id: listProjectArgs.roles } }, })
        return projectsByRole
      }
      // List All projects that have the same status
      const projectsByStatus = await this.projectRepository.find({ relations: { roles: true }, where: { status: listProjectArgs.status } })
      return projectsByStatus
    }
    //Return all projects if ArgsObject is empty
      const allProjects = await this.projectRepository.find()
      return allProjects
    }catch(error){ return error}
  }
}
