import { Field, ObjectType } from '@nestjs/graphql/dist/decorators';
import { Developer } from 'src/developers/entities/developer.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Role {
  
  @Field()
  @PrimaryGeneratedColumn('increment')
  id: number;
 
  @Field()
  @Column('text', {unique: true})
  name: string;
 
  @Field(() => [Project])
  @ManyToMany (() => Project, project => project.roles)
     projects: Project[]

  @Field(() => [Developer])
  @ManyToMany (() => Developer, developer => developer.roles)
  developers: Developer[]
}
