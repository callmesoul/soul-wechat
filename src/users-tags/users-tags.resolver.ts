import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserTagType } from './dto/user-tag.dto';
import { UsersTagsService } from './users-tags.service';

@Resolver('UsersTags')
export class UsersTagsResolver {
    constructor(
        private readonly usersTagsService: UsersTagsService,
      ) {}

    @Query(()=>[UserTagType])
    async getUsersTags(@Args('wechatId') wechatId: string) {
        return await this.usersTagsService.getUsersTags(wechatId)
    }
}
