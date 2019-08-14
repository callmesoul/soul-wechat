import { Resolver,Query, Mutation, Args } from '@nestjs/graphql'
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { UserInput } from '../users/inputs/user.input';
import { Any } from 'typeorm';
import { TokenInput } from './inputs/token.input';
import { TokenType } from './dto/register.dto';
import { AdminsService } from '../admins/admins.service';
import { AdminInput } from '../admins/inputs/admin.input';
import { AdminLoginInput } from '../admins/inputs/admin-login.input';


@Resolver('Auth')
export class AuthResolver {
    constructor(
        private readonly usersService: UsersService,
        private readonly adminService: AdminsService,
        private readonly authService: AuthService,
    ){}


    @Mutation(()=>TokenType)
    async login(@Args('input') input: UserInput){
        return await this.authService.login({isAdmin:false})
    }

    @Mutation(()=>TokenType)
    async adminLogin(@Args('input') input: AdminLoginInput){
        const admin = await this.adminService.findOneByEmail(input.email);
        if(admin && admin.password === input.password){
            return await this.authService.login({id: admin._id, name: admin.username, isAdmin: true});
        }else{
            throw new Error('用户或密码有误');
        }
    }

    @Mutation(()=>TokenType)
    async adminRegister(@Args('input') input: AdminInput){
        let admin = await this.adminService.findOneByEmail(input.email);
        if(admin){
            throw new Error('email已被注册');
        }else{
            let admin = await this.adminService.createAdmin(input);
            return await this.authService.login({id: admin._id, name: admin.username, isAdmin: true});
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
