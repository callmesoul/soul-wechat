import { Resolver,Query, Mutation, Args } from '@nestjs/graphql'
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { UserInput } from '..//users/inputs/user.input';
import { Any } from 'typeorm';
import { TokenInput } from './inputs/token.input';
import { TokenType } from './dto/register.dto';


@Resolver('Auth')
export class AuthResolver {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ){}


    @Mutation(()=>TokenType)
    async login(@Args('input') input: UserInput){
        const user = await this.usersService.findOneByUserName(input.username);
        if(user && user.password === input.password){
            return await this.authService.login(user)
        }else{
            console.log(user);
            throw new Error('用户或密码有误');
        }
    }

    @Mutation(()=>TokenType)
    async register(@Args('input') input: UserInput){
        const user = await this.usersService.createUser(input);
        if(user){
            return await this.authService.login(user);
        }
    }
}
