import { InputType, Field } from 'type-graphql'

@InputType()
export class AdminInput{
    @Field()
    readonly username: string;
    @Field()
    readonly password: string;
    @Field()
    readonly email: string;
}