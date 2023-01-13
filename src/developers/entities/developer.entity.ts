import { Field, ObjectType } from '@nestjs/graphql/dist/decorators';
import { Project } from 'src/projects/entities/project.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()

export class Developer {
  @Field()
  @PrimaryGeneratedColumn('increment')
  id: number;
 
  @Field()
  @Column('char')
  name: string;

  @Field()
  @Column('char')
  email: string;

  @Field(() => [Project])
  @ManyToMany (() => Project, project => project.developers)
  @JoinTable()
  projects: Project[]

  @Field(() => [Role])
  @ManyToMany (() => Role, role => role.developers)
  @JoinTable()
  roles: Role[]
}
