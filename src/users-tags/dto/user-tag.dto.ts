import { ObjectType, Field, ID, Int } from 'type-graphql'

@ObjectType()
export class UserTagType {
    @Field(() => ID)
    readonly _id: string;
    @Field(()=>Int)
    readonly count: number;
    @Field(()=>Int)
    readonly id: number;
    @Field()
    name:string;
    @Field()
    wechatId:string;
  }