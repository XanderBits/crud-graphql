import { BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  async create(CreateDeveloperInput: CreateDeveloperInput) {
    try{
      let {roles = [], ...createDeveloperInput} = CreateDeveloperInput;
      const emailExists = await this.DevRepository.findOneBy({email: createDeveloperInput.email});
      if(emailExists !== null) throw new HttpException(`Email address ${createDeveloperInput.email} already exists`, HttpStatus.BAD_REQUEST);
      const developer = this.DevRepository.create(createDeveloperInput);
      const findRoleIds = await this.RoleRepository.findBy({ id: In(roles) });

      developer.roles = findRoleIds;
      await this.DevRepository.save(developer);
      return developer;
    }catch(error){
      return error
    } 
  }

  findAll() {
    return `This action returns all developers`;
  }

  findByRoleAndProyect(id: number) {
    return `This action returns a #${id} developer`;
  }
}
