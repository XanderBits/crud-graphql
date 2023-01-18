import { Module } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { DevelopersResolver } from './developers.resolver';
import { Developer } from './entities/developer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RolesModule } from 'src/roles/roles.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  providers: [DevelopersResolver, DevelopersService],
  imports: [TypeOrmModule.forFeature([Developer, Project, Role, RolesModule, ProjectsModule])]
})
export class DevelopersModule {}