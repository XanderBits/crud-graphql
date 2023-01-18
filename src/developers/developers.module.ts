import { Module } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { DevelopersResolver } from './developers.resolver';
import { Developer } from './entities/developer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { RolesModule } from 'src/roles/roles.module';
@Module({
  providers: [DevelopersResolver, DevelopersService],
  imports: [TypeOrmModule.forFeature([Developer,Role, RolesModule,])],
  exports: [TypeOrmModule]
})
export class DevelopersModule {}