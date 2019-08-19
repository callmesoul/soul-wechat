import { ObjectType, Field, ID, Int } from 'type-graphql'

@ObjectType()
export class PaginationType {
    @Field(() => Int)
    readonly total: number;
    @Field(()=>Int)
    readonly pageCount: number;
    @Field(()=>Int)
    readonly page: number;
    @Field(()=>Int)
    readonly pageSize: number;
  }