import { Injectable } from '@nestjs/common';
import { ApiConfigKit, ApiConfig, AccessToken, IAccessTokenCache, HttpKit } from 'tnw'

@Injectable()
export class AccessTokenApiService {
    private static url: string = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s";
    /**
     * 获取 acces_token 
     * 1、先从缓存中获取，如果可用就直接返回
     * 2、如果缓存中的已过期就调用刷新接口来获取新的 acces_token 
     */
    public static async getAccessToken() {
        let ac: ApiConfig = ApiConfigKit.getApiConfig;
        let accessToken: AccessToken = this.getAvailableAccessToken(ac);
        if (accessToken && accessToken.isAvailable) {
            if(ApiConfigKit.isDevMode) console.log("缓存中的 accesstoken");
            return accessToken;
        }
        if(ApiConfigKit.isDevMode) console.log("刷新 accesstoken");
        return await this.refreshAccessToken(ac);;
    }
    /**
     * 通过 appId 从缓存中获取 acces_token
     * @param apiConfig 
     */
    private static getAvailableAccessToken(apiConfig: ApiConfig): AccessToken {
        let result!: AccessToken;
        let accessTokenCache: IAccessTokenCache = ApiConfigKit.getAccessTokenCache;
        let accessTokenJson: string = accessTokenCache.get(apiConfig.getAppId);
        if (accessTokenJson) {
            result = new AccessToken(accessTokenJson);
            if (result && result.isAvailable) {
                return result;
            }
        }
        return result;
    }

    /**
     * 获取新的 acces_token 并设置缓存
     * @param apiConfig 
     */
    public static async refreshAccessToken(apiConfig: ApiConfig) {
        let url = util.format(this.url, apiConfig.getAppId, apiConfig.getAppScrect);
        let data = await HttpKit.getHttpDelegate.httpGet(url);
        if (data) {
            let accessToken: AccessToken = new AccessToken(data)
            let accessTokenCache: IAccessTokenCache = ApiConfigKit.getAccessTokenCache;
            accessTokenCache.set(apiConfig.getAppId, accessToken.getCacheJson);
            return accessToken;
        } else {
            return "获取accessToken异常";
        }
    }
}
