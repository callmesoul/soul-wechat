import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTagSchema } from './users-tags.schema';
import { UsersTagsService } from './users-tags.service';
import { UsersTagsResolver } from './users-tags.resolver';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'UserTag', schema: UserTagSchema }]),
    ],
    providers: [UsersTagsService, UsersTagsResolver],
    exports: [UsersTagsService],
})
export class UsersTagsModule { }
