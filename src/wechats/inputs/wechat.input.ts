import { InputType, Field, Int, ID,  } from 'type-graphql'

@InputType()
export class WechatInput{
    @Field()
    readonly name!: string;
    @Field()
    readonly appId: string;
    @Field(()=>Int)
    readonly type: number;
    @Field()
    readonly appSecret: string;
    @Field()
    readonly encrypt: boolean;
}