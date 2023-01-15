import { Int } from '@nestjs/graphql';
import { Field, ObjectType } from '@nestjs/graphql/dist/decorators';
import { Project } from 'src/projects/entities/project.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()

export class Developer {
  @Field(() => Int, { nullable: true })
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
  @JoinTable({ 
    joinColumn: {
    name: 'developer_id',
    referencedColumnName: 'id',
  },
  inverseJoinColumn: {
    name: 'project_id',
    referencedColumnName: 'id',
  },})
  projects: Project[]

  @Field(() => [Role])
  @ManyToMany (() => Role, role => role.developers)
  @JoinTable({ 
    joinColumn: {
    name: 'developer_id',
    referencedColumnName: 'id',
  },
  inverseJoinColumn: {
    name: 'role_id',
    referencedColumnName: 'id',
  },})
  roles: Role[]
}
