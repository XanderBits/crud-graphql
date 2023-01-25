import { BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { In, Repository } from 'typeorm';
import { ListDevelopersArgs } from './dto/args/list-developer.args';
import { CreateDeveloperInput } from './dto/create-developer.input';
import { Developer } from './entities/developer.entity';


@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(Developer)
    private readonly DevRepository: Repository<Developer>,
    @InjectRepository(Role)
    private readonly RoleRepository: Repository<Role>,
  ) {}

  async create(CreateDeveloperInput: CreateDeveloperInput) {
    try{
      let {roles = [], ...createDeveloperInput} = CreateDeveloperInput;
      //Verify that the email is valid and return an exception if it is not. 
      const emailExists = await this.DevRepository.findOneBy({email: createDeveloperInput.email});
      if(emailExists !== null) throw new HttpException(`Email address ${createDeveloperInput.email} already exists`, HttpStatus.BAD_REQUEST);

      const developer = this.DevRepository.create(createDeveloperInput);
      //Checks to see if the role that the user has entered exists in the database.
      const findRoleIds = await this.RoleRepository.findBy({ id: In(roles) });
      developer.roles = findRoleIds;
      await this.DevRepository.save(developer);
      return developer;
    }catch(error){
      return error
    } 
  }

 async listDevelopers(listDeveloperArgs: ListDevelopersArgs) : Promise<Developer[]>{
    try{
      // If Args Object is not empty
      if( Object.keys(listDeveloperArgs).length !== 0 ){
        if(listDeveloperArgs.hasOwnProperty('roles') && listDeveloperArgs.hasOwnProperty('projects')){
          const developers = await this.DevRepository.find({
            relations: {roles: true, projects: true},
            where: {
              roles: {
                id: listDeveloperArgs.roles
              },
              projects: {id: listDeveloperArgs.projects}
            },
          })
        return developers;
        }
      // List All developers that have the same role 
      if(listDeveloperArgs.hasOwnProperty('roles')){
        const developersByRole = await this.DevRepository.find({ relations: { roles: true, projects: true }, where: { roles: { id: listDeveloperArgs.roles } }, })
        return developersByRole
      }
      // List All developers that have the same project
      const developersByProject = await this.DevRepository.find({ relations: { roles: true, projects: true }, where: { projects: { id: listDeveloperArgs.projects } } })
      return developersByProject
    }
    //Return all developers if ArgsObject is empty
      const allDevs = await this.DevRepository.find()
      return allDevs
    }catch(error){ return error}
  }
}
