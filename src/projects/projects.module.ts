import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { RolesModule } from 'src/roles/roles.module';
import { Role } from 'src/roles/entities/role.entity';
import { Developer } from 'src/developers/entities/developer.entity';
import { DevelopersModule } from 'src/developers/developers.module';
@Module({
  providers: [ProjectsResolver, ProjectsService],
  imports: [TypeOrmModule.forFeature([Role, Project, RolesModule, Developer, DevelopersModule])],
  exports: [TypeOrmModule]
})
export class ProjectsModule {}
