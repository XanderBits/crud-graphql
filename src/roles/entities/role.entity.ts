import { Field, ObjectType } from '@nestjs/graphql/dist/decorators';
import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Role {
  
  @Field()
  @PrimaryGeneratedColumn('increment')
  id: number;
 
  @Field()
  @Column('text', {unique: true})
  name: string;

  @OneToMany(type => Project, project => project.role)
  projects: Project[];
}
