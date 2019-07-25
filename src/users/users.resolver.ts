import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './dto/create-user.dto';
import { UserInput } from './inputs/user.input';

@Resolver('Users')
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,
    ){}

    @Query(()=>UserType)
    async hello(username:string){
        return this.usersService.findOneByUserName(username)
    }
};
