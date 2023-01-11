import { Field, ObjectType } from '@nestjs/graphql/dist/decorators';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

 @Field()
 @Column('text')
 status: string

 @ManyToOne(type => Role, (role) => role.projects)
 role: Role
}
