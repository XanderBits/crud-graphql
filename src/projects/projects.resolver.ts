import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { ListProjectsArgs } from './dto/args/list-project.args';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => Project)
  async createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput) {
    return this.projectsService.create(createProjectInput);
  }
  @Mutation(() => Project)
  async addDevToProject(@Args('addDevToProject') updateProjectInput: UpdateProjectInput){
    return await this.projectsService.addDevToProject(updateProjectInput)
  }
  @Query(() => Project, {name: "listProjects", description: "This query returns a list of projects that can be filtered by roles and status"})
  async listProjects( @Args({nullable: true}) listProjectArgs : ListProjectsArgs ){
    return await this.projectsService.listProjects( listProjectArgs );
  }
}
