import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class TokenType {
    @Field()
    readonly token: string;
  }