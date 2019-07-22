import { Resolver,Query, Mutation, Args } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { UserType } from './dto/create-user.dto';
import { UserInput } from './inputs/user.input';

@Resolver()
export class UserResolver {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  

  @Query(()=>[UserType])
  async users(){
      return this.usersService.findAll();
  }

 

  @Mutation(()=>UserType)
  async register(@Args('input') input: UserInput){
      return this.usersService.create(input);
  }
}