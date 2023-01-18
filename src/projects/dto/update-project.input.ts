import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProjectInput {
  @Field(() => Int)
  project: number

  @Field(() => Int)
  developer: number
}