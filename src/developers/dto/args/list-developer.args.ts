import { ArgsType, Field, Int } from "@nestjs/graphql"
import { IsOptional } from "class-validator"

@ArgsType()
export class ListDevelopersArgs{
    @IsOptional()
    @Field(() => Int, {nullable: true})
    roles?: number

    @IsOptional()
    @Field(() => Int, {nullable: true})
    projects?: number
}