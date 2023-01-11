import { Module } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { DevelopersResolver } from './developers.resolver';
import { Developer } from './entities/developer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [DevelopersResolver, DevelopersService],
  imports: [TypeOrmModule.forFeature([Developer])]
})
export class DevelopersModule {}