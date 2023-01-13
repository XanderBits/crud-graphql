import { registerEnumType } from "@nestjs/graphql";

export enum AllowedStatus{
    'NOT_STARTED', 
    'IN_PROGRESS', 
    'COMPLETED',
}

registerEnumType(AllowedStatus,{
    name: 'AllowedStatus',
    description: 'The supported status',
});