import { Controller, Get, Req, Res, Post } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiConfigKit, WeChat} from 'tnw'
import { WechatsService } from './wechats.service';
import { MsgController } from '../msg/msg.controller';

const msgAdapter = new MsgController();

@Controller('wechats')
export class WechatsController {
    constructor(
        private readonly wechatsService:WechatsService
    ) { }

    @Get('/check')
    async checkWechatMsg(@Req() request: Request, @Res() response: Response) {
        let wechatId: string = request.query.wechatId;
        console.log('wechatId:',wechatId);
        if (wechatId) {
            let wechat= await this.wechatsService.findById(wechatId);
            if(wechat){
                ApiConfigKit.setCurrentAppId(wechat.appId);
                let signature = request.query.signature,//微信加密签名
                    timestamp = request.query.timestamp,//时间戳
                    nonce = request.query.nonce,//随机数
                    echostr = request.query.echostr;//随机字符串
                let checkSignature=WeChat.checkSignature(signature, timestamp, nonce, echostr);
                console.log(checkSignature);
                response.send(checkSignature);
            }
        }
    }

    @Post('/check')
    async getWechatMsg(@Req() request: Request, @Res() response: Response) {
        let wechatId = request.query.wechatId;
        let wechat= await this.wechatsService.findById(wechatId);
        ApiConfigKit.setCurrentAppId(wechat.appId);
        let msgSignature = request.query.msg_signature,
            timestamp = request.query.timestamp,
            nonce = request.query.nonce;
        //监听 data 事件 用于接收数据
        let buffer = [];
        request.on('data', function (data) {
            buffer.push(data);
        });
        request.on('end', function () {
            let msgXml = Buffer.concat(buffer).toString('utf-8');
            // 接收消息并响应对应的回复
            WeChat.handleMsg(msgAdapter, msgXml, msgSignature, timestamp, nonce).then(data => {
                response.send(data);
            });
        });
    }
}
