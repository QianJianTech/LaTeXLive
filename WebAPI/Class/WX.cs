using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

using LaTeXAPI.Interface;
using LaTeXAPI.Models;

using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

using ToolsOfPanda.Interface;

namespace LaTeXAPI.Class
{
    /// <summary>
    /// 微信登录接口类
    /// </summary>
    public class WX : ILogin
    {
        private IDBTool _db { get; }

        private IHttpTool _http { get; }

        private latexliveContext _dbcontext { get; }

        private string Appid { get; }

        private string AppSecret { get; }

        private WX() { }

        /// <summary>
        /// 微信登录接口实例化
        /// </summary>
        /// <param name="configuration"></param>
        /// <param name="db"></param>
        /// <param name="http"></param>
        /// <param name="context"></param>
        public WX(IConfiguration configuration, IDBTool db, IHttpTool http, latexliveContext context)
        {
            _db = db;
            _http = http;
            _dbcontext = context;
            Appid = configuration.GetSection("WeChat").GetSection("AppId").Value;
            AppSecret = configuration.GetSection("WeChat").GetSection("AppSecret").Value;
        }

        /// <summary>
        /// 通过微信Code登录
        /// </summary>
        /// <param name="WXcode">微信code</param>
        /// <param name="nothing">不填</param>
        /// <returns></returns>
        public Client Login(string WXcode, string nothing)
        {
            WXToken token = GetWXToken(WXcode).Result;
            WXUserInfo info = GetWXUserInfo(token).Result;
            List<Client> clients = _dbcontext.Clients.Where(c => c.Wechat == info.openid && c.Status == Client.ClientStatus.normal.ToString()).ToList();
            if (clients.Count == 1)
            {
                return clients[0].HidePassword();
            }
            else if (clients.Count < 1)
            {
                return new Client()
                {
                    Wechat = info.openid,
                    Nickname = info.nickname,
                };
            }
            else
            {
                throw new Exception(MyException.RecordRepeat(JsonConvert.SerializeObject(clients)));
            }
        }

        /// <summary>
        /// 获得微信用户信息
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        private async Task<WXUserInfo> GetWXUserInfo(WXToken token)
        {
            string url = "https://api.weixin.qq.com/sns/userinfo?access_token=" + token.access_token + "&openid=" + token.openid;
            string str_info = await _http.GetFromWeb(url);
            Regex reg_err_token = new("^{\"errcode\":");
            if (reg_err_token.IsMatch(str_info))
            {
                throw new Exception(MyException.GetWXUserinfoWrong(str_info));
            }
            else
            {
                return JsonConvert.DeserializeObject<WXUserInfo>(str_info);
            }
        }

        /// <summary>
        /// 获得微信token
        /// </summary>
        /// <param name="WXcode"></param>
        /// <returns></returns>
        private async Task<WXToken> GetWXToken(string WXcode)
        {
            string url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + Appid + "&secret=" + AppSecret + "&code=" + WXcode + "&grant_type=authorization_code";
            string str_token = await _http.GetFromWeb(url);
            Regex reg_err_token = new("^{\"errcode\":");
            if (reg_err_token.IsMatch(str_token))
            {
                throw new Exception(MyException.GetWXTokenWrong(str_token));
            }
            else
            {
                return JsonConvert.DeserializeObject<WXToken>(str_token);
            }
        }
    }

    /// <summary>
    /// 微信返回微信token对象
    /// </summary>
    public class WXToken
    {
        /// <summary>
        /// token
        /// </summary>
        public string access_token { get; set; }
        /// <summary>
        /// 过期时间
        /// </summary>
        public int expires_in { get; set; }
        /// <summary>
        /// 刷新Token用的token
        /// </summary>
        public string refresh_token { get; set; }
        /// <summary>
        /// 用户唯一id
        /// </summary>
        public string openid { get; set; }
        /// <summary>
        /// 防跨域攻击参数
        /// </summary>
        public string scop { get; set; }
        /// <summary>
        /// 同一微信开放平台唯一id
        /// </summary>
        public string unionid { get; set; }
    }

    /// <summary>
    /// 微信返回微信账户信息对象
    /// </summary>
    public class WXUserInfo
    {
        /// <summary>
        /// 用户唯一id
        /// </summary>
        public string openid { get; set; }
        /// <summary>
        /// 用户昵称
        /// </summary>
        public string nickname { get; set; }
        /// <summary>
        /// 用户性别
        /// </summary>
        public string sex { get; set; }
        /// <summary>
        /// 用户省份
        /// </summary>
        public string province { get; set; }
        /// <summary>
        /// 用户城市
        /// </summary>
        public string city { get; set; }
        /// <summary>
        /// 用户国家
        /// </summary>
        public string country { get; set; }
        /// <summary>
        /// 用户头像url
        /// </summary>
        public string headimgurl { get; set; }
        /// <summary>
        /// 用户微信特权
        /// </summary>
        public string[] privilege { get; set; }
        /// <summary>
        /// 同一微信开放账号下唯一id
        /// </summary>
        public string unionid { get; set; }
    }
}
