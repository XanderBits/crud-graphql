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
    @Column('char', {unique: true, length: 50})
    name: string;

    @Field()
    @Column('char', {length: 255}) 
    description: string;

    @Field(() => AllowedStatus)
    @Column({type: 'enum', enum: AllowedStatus})
    status: AllowedStatus

    @ManyToMany(() => Developer, developer => developer.projects)
    @Field(() => [Developer], { nullable: true })
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
