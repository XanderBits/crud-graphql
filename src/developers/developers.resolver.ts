import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DevelopersService } from './developers.service';
import { Developer } from './entities/developer.entity';
import { CreateDeveloperInput } from './dto/create-developer.input';
import { UpdateDeveloperInput } from './dto/update-developer.input';

@Resolver(() => Developer)
export class DevelopersResolver {
  constructor(private readonly developersService: DevelopersService) {}

  @Mutation(() => Developer)
  createDeveloper(@Args('createDeveloperInput') createDeveloperInput: CreateDeveloperInput) {
    return this.developersService.create(createDeveloperInput);
  }

  @Query(() => [Developer], { name: 'developers' })
  findAll() {
    return this.developersService.findAll();
  }

  @Query(() => Developer, { name: 'developer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.developersService.findOne(id);
  }

  @Mutation(() => Developer)
  updateDeveloper(@Args('updateDeveloperInput') updateDeveloperInput: UpdateDeveloperInput) {
    return this.developersService.update(updateDeveloperInput.id, updateDeveloperInput);
  }

  @Mutation(() => Developer)
  removeDeveloper(@Args('id', { type: () => Int }) id: number) {
    return this.developersService.remove(id);
  }
}
