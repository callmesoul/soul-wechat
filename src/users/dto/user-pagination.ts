import { ObjectType, Field, ID, Int } from 'type-graphql'
import { UserType } from './create-user.dto';
import { PaginationType } from '../../pagination';

@ObjectType()
export class UserPagination {
    @Field((type)=>UserType)
    readonly users: UserType[];
    
    @Field((tyep)=>PaginationType)
    readonly pagination:PaginationType;
  }