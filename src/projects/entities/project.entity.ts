import { Int } from '@nestjs/graphql';
import { Field, ObjectType } from '@nestjs/graphql/dist/decorators';
import { Developer } from 'src/developers/entities/developer.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AllowedStatus } from '../project.status.enum';

@Entity()
@ObjectType()
export class Project {
    @Field(() => Int, { nullable: true })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column('char', {unique: true})
    name: string;

    @Field()
    @Column('char')
    description: string

    @Field(type => AllowedStatus)
    @Column('text')
    status: AllowedStatus

    @ManyToMany(() => Developer, developer => developer.projects)
    @Field(() => [Developer])
    developers: Developer[]

    @ManyToMany (() => Role, role => role.projects)
    @Field(() => [Role], { nullable: true })
    @JoinTable({ 
        joinColumn: {
        name: 'project_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'role_id',
        referencedColumnName: 'id',
      },})
    roles: Role[]
}
