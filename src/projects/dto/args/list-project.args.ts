import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsEnum, IsInt, IsOptional } from "class-validator";
import { AllowedStatus } from "src/projects/project.status.enum";

@ArgsType()
export class ListProjectsArgs{
    @IsOptional()
    @Field(() => Int, {nullable: true})
    roles?: number

    @IsOptional()
    @Field(() => AllowedStatus, {nullable: true})
    status?: AllowedStatus
}