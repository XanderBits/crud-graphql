import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';

@Module({
  providers: [ProjectsResolver, ProjectsService],
  imports: [TypeOrmModule.forFeature([Project])]
})
export class ProjectsModule {}
