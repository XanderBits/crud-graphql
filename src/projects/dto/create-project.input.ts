import { InputType, Field } from '@nestjs/graphql';
import {IsEnum, IsString, MinLength } from 'class-validator';
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
  status: AllowedStatus
  
  @Field(() => [Number])
  roles: number[]
}
