import { Controller } from '@nestjs/common';
import { OutTextMsg, OutVoiceMsg, OutVideoMsg, OutImageMsg, OutNewsMsg, InFollowEvent, InQrCodeEvent } from 'tnw'

@Controller('msg')
export class MsgController {
    // 处理文本消息
    processInTextMsg(inTextMsg) {
        let outMsg;
        let content = "IJPay 让支付触手可及 \n\nhttps://gitee.com/javen205/IJPay";
        if ("1" == inTextMsg.getContent) {
            content = "极速开发微信公众号 \n\nhttps://github.com/javen205/TNW";
            outMsg = new OutTextMsg(inTextMsg);
            outMsg.setContent(content);
        } else if ("2" == inTextMsg.getContent) {
            outMsg = new OutNewsMsg(inTextMsg);
            outMsg.addArticle("聚合支付了解下", "IJPay 让支付触手可及", "https://gitee.com/javen205/IJPay/raw/master/assets/img/IJPay-t.png", "https://gitee.com/javen205/IJPay");
            outMsg.addArticle("jfinal-weixin", "极速开发微信公众号", "https://gitee.com/javen205/IJPay/raw/master/assets/img/IJPay-t.png", "https://gitee.com/JFinal/jfinal-weixin");
        } else {
            outMsg = new OutTextMsg(inTextMsg);
            outMsg.setContent(content);
        }
        return outMsg;
    }
    // 处理图片消息
    processInImageMsg(inImageMsg) {
        let outMsg = new OutImageMsg(inImageMsg);
        outMsg.setMediaId = inImageMsg.getMediaId;
        return outMsg;
    }
    // 处理声音消息
    processInVoiceMsg(inVoiceMsg) {
        let outMsg = new OutVoiceMsg(inVoiceMsg);
        outMsg.setMediaId = inVoiceMsg.getMediaId;
        return outMsg;
    }
    // 处理视频消息
    processInVideoMsg(inVideoMsg) {
        let outMsg = new OutVideoMsg(inVideoMsg);
        outMsg.setMediaId = inVideoMsg.getMediaId;
        outMsg.setDescription = "IJPay 让支付触手可及";
        outMsg.setTitle = "视频消息";
        return outMsg;
    }
    // 处理小视频消息
    processInShortVideoMsg(inShortVideoMsg) {
        let outMsg = new OutVideoMsg(inShortVideoMsg);
        outMsg.setMediaId = inShortVideoMsg.getMediaId;
        outMsg.setDescription = "TypeScript + Node.js 开发微信公众号";
        outMsg.setTitle = "短视频消息";
        return outMsg;
    }
    // 处理地理位置消息
    processInLocationMsg(inLocationMsg) {
        return this.renderOutTextMsg(inLocationMsg, "位置消息... \n\nX:" + inLocationMsg.getLocation_X + " Y:" + inLocationMsg.getLocation_Y + "\n\n" + inLocationMsg.getLabel);
    }
    // 处理链接消息
    processInLinkMsg(inLinkMsg) {
        let text = new OutTextMsg(inLinkMsg);
        text.setContent("链接频消息..." + inLinkMsg.getUrl);
        return text;
    }
    // 处理语音识别结果
    processInSpeechRecognitionResults(inSpeechRecognitionResults) {
        let text = new OutTextMsg(inSpeechRecognitionResults);
        text.setContent("语音识别消息..." + inSpeechRecognitionResults.getRecognition);
        return text;
    }
    // 处理关注、取消关注事件
    processInFollowEvent(inFollowEvent) {
        if (InFollowEvent.EVENT_INFOLLOW_SUBSCRIBE == inFollowEvent.getEvent) {
            return this.renderOutTextMsg(inFollowEvent, "感谢你的关注 么么哒 \n\n交流群：114196246");
        } else if (InFollowEvent.EVENT_INFOLLOW_UNSUBSCRIBE == inFollowEvent.getEvent) {
            console.error("取消关注：" + inFollowEvent.getFromUserName);
            return this.renderOutTextMsg(inFollowEvent,null);
        } else {
            return this.renderOutTextMsg(inFollowEvent,null);
        }
    }
    // 处理扫码事件
    processInQrCodeEvent(inQrCodeEvent) {
        if (InQrCodeEvent.EVENT_INQRCODE_SUBSCRIBE == inQrCodeEvent.getEvent) {
            console.debug("扫码未关注：" + inQrCodeEvent.getFromUserName);
            return this.renderOutTextMsg(inQrCodeEvent, "感谢您的关注，二维码内容：" + inQrCodeEvent.getEventKey);
        } else if (InQrCodeEvent.EVENT_INQRCODE_SCAN == inQrCodeEvent.getEvent) {
            console.debug("扫码已关注：" + inQrCodeEvent.getFromUserName);
            return this.renderOutTextMsg(inQrCodeEvent,null);
        } else {
            return this.renderOutTextMsg(inQrCodeEvent,null);
        }
    }
    // 处理地理位置事件
    processInLocationEvent(inLocationEvent) {
        console.debug("发送地理位置事件：" + inLocationEvent.getFromUserName);
        return this.renderOutTextMsg(inLocationEvent, "地理位置是：" + inLocationEvent.getLatitude);
    }
    // 处理菜单事件：
    processInMenuEvent(inMenuEvent) {
        console.debug("菜单事件：" + inMenuEvent.getFromUserName);
        return this.renderOutTextMsg(inMenuEvent, "菜单事件内容是：" + inMenuEvent.getEventKey);
    }
    // 处理模板消息事件
    processInTemplateMsgEvent(inTemplateMsgEvent) {
        console.debug("模板消息事件：" + inTemplateMsgEvent.getFromUserName + " " + inTemplateMsgEvent.getStatus);
        return this.renderOutTextMsg(inTemplateMsgEvent, "消息发送状态：" + inTemplateMsgEvent.getStatus);
    }
    // 处理未定义的消息(其他消息...小哥该扩展了)
    processIsNotDefinedMsg(inNotDefinedMsg) {
        return this.renderOutTextMsg(inNotDefinedMsg, "未知消息");
    }
    renderOutTextMsg(inMsg, content) {
        let outMsg = new OutTextMsg(inMsg);
        outMsg.setContent(content ? content : " ");
        return outMsg;
    }
}
