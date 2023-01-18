import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { RolesModule } from 'src/roles/roles.module';
import { Role } from 'src/roles/entities/role.entity';
@Module({
  providers: [ProjectsResolver, ProjectsService],
  imports: [TypeOrmModule.forFeature([Role, Project, RolesModule])],
  exports: [TypeOrmModule]
})
export class ProjectsModule {}
