import { InputType, Field } from 'type-graphql'

@InputType()
export class TokenInput{
    @Field()
    readonly token: string;
}