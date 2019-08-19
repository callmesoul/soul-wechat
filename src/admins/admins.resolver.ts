import { Resolver } from '@nestjs/graphql';
import { AdminsService } from './admins.service';
import { UseGuards } from '@nestjs/common';
import { GqlGuard } from '../gql.guard';

@Resolver('Admin')
export class AdminResolver {
    constructor(
        private readonly adminService: AdminsService
    ){}
}
