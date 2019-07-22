import { InputType, Field, Int } from 'type-graphql'

@InputType()
export class WechatInput{
    @Field()
    readonly name: string;
    @Field(()=>Int)
    readonly type: number;
    @Field()
    readonly appId: string;
    @Field()
    readonly appSecret: string;
    @Field()
    readonly createdAt: Date;
}