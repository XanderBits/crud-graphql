import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DevelopersService } from './developers.service';
import { Developer } from './entities/developer.entity';
import { CreateDeveloperInput } from './dto/create-developer.input';
import { ListDevelopersArgs } from './dto/args/list-developer.args';

@Resolver(() => Developer)
export class DevelopersResolver {
  constructor(private readonly developersService: DevelopersService) {}

  @Mutation(() => Developer)
  createDeveloper(@Args('createDeveloperInput') createDeveloperInput: CreateDeveloperInput) {
    return this.developersService.create(createDeveloperInput);
  }

  @Query(() => [Developer], {name: "listDevelopers", description: "This query returns a list of developers that can be filtered by roles and project"})
  async listDevelopers( @Args({nullable: true}) listProjectArgs : ListDevelopersArgs ) : Promise<Developer[]>{
    return await this.developersService.listDevelopers( listProjectArgs );
  }
}
