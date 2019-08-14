import { ObjectType, Field, Int, ID } from 'type-graphql'

@ObjectType()
export class WechatType {
    @Field(() => ID)
    readonly id: string;
    @Field(()=>Int)
    readonly type: number;
    @Field()
    readonly name: string;
    @Field()
    readonly appId: string;
    @Field()
    readonly appSecret: string;
    @Field()
    readonly token: string;
    @Field()
    readonly encrypt: boolean;
    @Field()
    readonly encodingAesKey: string;
    @Field(() => ID)
    readonly userId: string;
  }