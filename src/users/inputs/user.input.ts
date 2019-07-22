import { InputType, Field, Int } from 'type-graphql'

@InputType()
export class UserInput{
    @Field()
    readonly userName: string;
    @Field()
    readonly passWord: string;
}