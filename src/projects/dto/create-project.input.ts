import { InputType, Field } from '@nestjs/graphql';
import {IsEnum, IsIn, IsString, MinLength } from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';
import { AllowedStatus } from '../project.status.enum';
@InputType()
export class CreateProjectInput {
  @IsString()
  @MinLength(2)
  @Field()
  name: string

  @IsString()
  @MinLength(2)
  @Field()
  description: string
  
  @Field()
  @IsEnum(AllowedStatus)
  status: string

  @Field()
  roles: Role[]
}
