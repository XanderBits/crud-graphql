import { Field, ObjectType } from '@nestjs/graphql/dist/decorators';
import { Developer } from 'src/developers/entities/developer.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AllowedStatus } from '../project.status.enum';

@Entity()
@ObjectType()
export class Project {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column('char', {unique: true})
    name: string;

    @Field()
    @Column('char')
    description: string

    @Field(type => AllowedStatus)
    @Column()
    status: AllowedStatus

    @Field(() => [Developer])
    @ManyToMany(() => Developer, developer => developer.projects)
    developers: Developer[]

    @Field(() => [Role])
    @ManyToMany (() => Role, role => role.projects)
    @JoinTable()
    roles: Role[]
}
