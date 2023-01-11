import { Field, InputType, ObjectType } from '@nestjs/graphql/dist/decorators';
import { IsString,  MinLength  } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @IsString()
  @MinLength(2)
  @Field()
  name: string
}
