import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

@Injectable()
export class UsersTagsService {
    constructor(
        @InjectModel('UserTag') private userTagModel:Model
    ){}

    async getUsersTags(wechatId:string){
        console.log(wechatId);
        let tags =  await this.userTagModel.find({wechatId:wechatId})
        console.log(tags);
        return tags;
    }

    async update(usersTag:any){
        return await this.userTagModel.update({ id: usersTag.id }, usersTag)
    }

    async create(usersTag:any){
        return await this.userTagModel.create(usersTag)
    }
}
