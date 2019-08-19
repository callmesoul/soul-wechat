import { InputType, Field } from 'type-graphql'

@InputType()
export class AdminLoginInput{
    @Field()
    readonly password: string;
    @Field()
    readonly email: string;
}