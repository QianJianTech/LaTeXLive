using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.RegularExpressions;

using LaTeXAPI.Interface;
using LaTeXAPI.Models;

using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

using ToolsOfPanda;
using ToolsOfPanda.Interface;

namespace LaTeXAPI.Class
{
    /// <summary>
    /// 短信登录类
    /// </summary>
    public class MessageCode : ILogin, IMessageCode
    {
        private IConfiguration _configuration { get; }

        private IDBTool _db { get; }

        private IRedisTool _redis { get; }

        private IAliyunMessageCodeTool _message { get; }

        private latexliveContext _dbcontext { get; }

        private string KeyId { get; }

        private string KeySecret { get; }

        private int RedisDBNum_verify { get; }

        private int RedisDBNum_frequens { get; }

        private MessageCode() { }

        /// <summary>
        /// 短信登录接口实例化
        /// </summary>
        /// <param name="configuration"></param>
        /// <param name="db"></param>
        /// <param name="redis"></param>
        /// <param name="message"></param>
        /// <param name="context"></param>
        public MessageCode(IConfiguration configuration, IDBTool db, IRedisTool redis, IAliyunMessageCodeTool message, latexliveContext context)
        {
            _configuration = configuration;
            _db = db;
            _redis = redis;
            _message = message;
            _dbcontext = context;
            RedisDBNum_verify = Convert.ToInt32(_configuration.GetSection("RedisDBNum").GetSection("MessageCode").Value);
            RedisDBNum_frequens = Convert.ToInt32(_configuration.GetSection("RedisDBNum").GetSection("MessageFrequens").Value);
            KeyId = _configuration.GetSection("AliYun").GetSection("AccessKeyId").Value;
            KeySecret = _configuration.GetSection("AliYun").GetSection("AccessKeySecret").Value;

        }

        /// <summary>
        /// 通过短信验证码登录
        /// </summary>
        /// <param name="tel"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        public Client Login(string tel, string code)
        {
            if (!IsPhoneNumber(tel))
            {
                throw new Exception(MyException.TelFormatWrong(tel));
            }
            if (!IsVerifyCodeOK(tel, code))
            {
                throw new Exception(MyException.VerifyCodeWrong(code));
            }
            List<Client> clients = _dbcontext.Clients.Where(c => c.Tel == tel && c.Status == Client.ClientStatus.normal.ToString()).ToList();
            if (clients.Count == 1)
            {
                return clients[0].HidePassword();
            }
            else if (clients.Count < 1)
            {
                return new Client()
                {
                    Tel = tel,
                };
            }
            else
            {
                throw new Exception(MyException.RecordRepeat(JsonConvert.SerializeObject(clients)));
            }
        }

        /// <summary>
        /// 验证身份
        /// </summary>
        /// <param name="id"></param>
        /// <param name="tel"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        public string Identity(int id, string code, string tel = "")
        {
            List<Client> clients = _dbcontext.Clients.Where(c => c.Id == id).ToList();
            if (clients[0].Tel == "")
            {
                if (tel == "")
                {
                    throw new Exception(MyException.HaveNotBindTel());
                }
                else
                {
                    if (!IsVerifyCodeOK(tel, code))
                    {
                        throw new Exception(MyException.VerifyCodeWrong(code));
                    }
                    return tel;
                }
            }
            else
            {
                if (!IsVerifyCodeOK(clients[0].Tel, code))
                {
                    throw new Exception(MyException.VerifyCodeWrong(code));
                }
                return clients[0].Tel;
            }
        }

        /// <summary>
        /// 发送验证码
        /// </summary>
        /// <param name="tel"></param>
        /// <param name="templatecode"></param>
        /// <returns></returns>
        public void SendVerifyCode(string tel, string templatecode)
        {
            if (!IsPhoneNumber(tel))
            {
                throw new Exception(MyException.TelFormatWrong(tel));
            }
            int time = GetRemainTime(tel);
            if (time != 0)
            {
                throw new Exception(MyException.SendVerifyCodeFrequence(time.ToString()));
            }
            string code = GetVerifyCode(tel);
            string TemplateCode = templatecode;
            string SignName = _configuration.GetSection("AliYun").GetSection("Message").GetSection("SignName").Value;
            Dictionary<string, string> dic_code = new()
            {
                { "code", code }
            };
            _message.Send(tel, SignName, TemplateCode, dic_code);
            _redis.String_Set(tel, Common.GetNowTimeStamp().ToString(), RedisDBNum_frequens, 60);
        }

        /// <summary>
        /// 一分钟禁止发送剩余秒数
        /// </summary>
        /// <param name="tel"></param>
        /// <returns></returns>
        public int GetRemainTime(string tel)
        {
            try
            {
                if (_redis.String_Exist(tel, RedisDBNum_frequens))
                {
                    long old_time = Convert.ToInt64(_redis.String_Get(tel, RedisDBNum_frequens));
                    long current_time = Common.GetNowTimeStamp();
                    int remain_time = 60 - (int)(current_time - old_time) / 1000;
                    return remain_time;
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// 生成验证码
        /// </summary>
        /// <param name="tel">指定手机号</param>
        /// <returns></returns>
        private string GetVerifyCode(string tel)
        {
            try
            {

                string code;
                //验证码5分钟是否已过期，没过期返回此验证码，过期了生成新的
                if (_redis.String_Exist(tel, RedisDBNum_verify))
                {
                    code = _redis.String_Get(tel, RedisDBNum_verify);
                }
                else
                {
                    code = Common.GetRandomCode(6);
                    _redis.String_Set(tel, code, RedisDBNum_verify, 300);
                }
                return code;
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// 判断验证码是否正确
        /// </summary>
        /// <param name="tel"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        private bool IsVerifyCodeOK(string tel, string code)
        {
            if (!_redis.String_Exist(tel, RedisDBNum_verify))
            {
                throw new Exception(MyException.VerifyCodeExpired());
            }
            if (_redis.String_Get(tel, RedisDBNum_verify) != code)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        /// <summary>
        /// 清除缓存中的验证码
        /// </summary>
        /// <param name="tel"></param>
        public void ClearVerifyCode(string tel)
        {
            _redis.Key_Del(tel, RedisDBNum_verify);
            _redis.Key_Del(tel, RedisDBNum_frequens);
        }

        /// <summary>
        /// 手机号格式是否正确
        /// </summary>
        /// <param name="tel"></param>
        /// <returns></returns>
        private static bool IsPhoneNumber(string tel)
        {
            Regex reg_err_tel = new(@"^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,3-9]))\d{8}$");
            return reg_err_tel.IsMatch(tel);
        }

    }


    /// <summary>
    /// 阿里云短信接口返回对象
    /// </summary>
    public class AliyunMessage
    {
        /// <summary>
        /// 请求ID
        /// </summary>
        public string RequestId { get; set; }

        /// <summary>
        /// 信息
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// 未知字段
        /// </summary>
        public string BizId { get; set; }

        /// <summary>
        /// 代码
        /// </summary>
        public string Code { get; set; }
    }
}
