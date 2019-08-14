import { InputType, Field, Int} from 'type-graphql'

@InputType()
export class UserInput{
    @Field(()=>[Int!])
    readonly tagid_list!:number[];
    @Field(()=>Int)
    readonly subscribe: number;
    @Field()
    readonly openid: string;
    @Field()
    readonly nickname: string;
    @Field()
    readonly sex: string;
    @Field()
    readonly language: string;
    @Field()
    readonly city: string;
    @Field()
    readonly province: string;
    @Field()
    readonly country: string;
    @Field()
    readonly headimgurl: string;
    @Field(()=>Int)
    readonly subscribe_time: number;
    @Field()
    readonly unionid: string;
    @Field()
    readonly remark: string;
    @Field()
    readonly groupid: string;
    @Field()
    readonly subscribe_scene:string;
    @Field(()=>Int)
    readonly qr_scene:number;
    @Field()
    readonly qr_scene_str:string;
    @Field()
    readonly wechatId:string;
}