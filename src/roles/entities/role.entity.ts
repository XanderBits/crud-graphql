import { Int } from '@nestjs/graphql';
import { Field, ObjectType } from '@nestjs/graphql/dist/decorators';
import { Developer } from 'src/developers/entities/developer.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Role {
  
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn('increment')
  id: number;
 
  @Field()
  @Column('text', {unique: true})
  name: string;
 
  @ManyToMany (() => Project, project => project.roles)
  @Field(() => [Project], {nullable: true})
  projects: Project[]

  @ManyToMany (() => Developer, developer => developer.roles)
  @Field(() => [Developer])
  developers: Developer[]
}
