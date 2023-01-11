import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDeveloperInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
