import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './dto/create-user.dto';
import { UserInput } from './inputs/user.input';
import { UserPagination } from './dto/user-pagination';
import { Int } from 'type-graphql';


@Resolver('Users')
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,
    ){}

    @Query(()=>UserType)
    async hello(username:string){
        return this.usersService.findOneByUserName(username)
    }

    @Query(()=>UserPagination)
    async getUsers(
        @Args({ name: 'page', type: () => Int, nullable: true, defaultValue:1 }) page:number,
        @Args({ name: 'pageSize', type: () => Int, nullable: true, defaultValue: 10 }) pageSize: number,
        @Args({ name: 'wechatId', type: () => String, nullable: false}) wechatId: string,
        @Args({ name: 'nickname', type: () => String, nullable: true, defaultValue: ''}) nickname: string,
        @Args({ name: 'tagId', type: () => Int, nullable: true }) tagId: number,
    ){
        let params:any = {
            page:page, 
            pageSize:pageSize,
            where:{
                wechatId:wechatId,
                status: 1, //正常用户
            }
        }
        if(nickname !== '' ) {
            params.where.nickname = {
                $regex: nickname,
                $options: 'i'
            }
        }
        if (tagId) {
            params.where.tagid_list = {
                $elemMatch:{ $eq: tagId }
            }
        }
        return this.usersService.find(params)
    }

    
};
