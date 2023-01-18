import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';
@InputType()
export class CreateDeveloperInput {
  @Field()
  @IsString()
  @MinLength(2)
  name: string

  @Field()
  @IsEmail()
  email: string

  @Field(type => [Number])
  @IsNotEmpty()
  projects: number[]

  @Field(type => [Number])
  @IsNotEmpty()
  roles: number[]
}
