import { CreateDeveloperInput } from './create-developer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDeveloperInput extends PartialType(CreateDeveloperInput) {
  @Field(() => Int)
  id: number;
}
