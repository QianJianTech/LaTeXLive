using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

using LaTeXAPI.Class;
using LaTeXAPI.Interface;
using LaTeXAPI.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

using ToolsOfPanda.Interface;

namespace LaTeXAPI
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private IConfiguration _configuration { get; }

        private IHttpContextAccessor _contextAccessor { get; }

        private IDBTool _db { get; }

        private IResult _re { get; }

        private List<ILogin> _logins { get; }

        private IClient _client { get; }

        private IMyToken _mytoken { get; }

        private IMessageCode _messagecode { get; }

        private IPermission _permission { get; }

        private IMathPix _mathpix { get; }

        private IIPAddressRecord _ipAddressRecord { get; }

        public ClientController(IConfiguration configuration, IHttpContextAccessor contextAccessor, latexliveContext context, IDBTool db, IResult re, IEnumerable<ILogin> logins, IClient client, IMyToken mytoken, IMessageCode messagecode, IPermission permission, IMathPix mathpix, IIPAddressRecord ipAddressRecord)
        {
            _configuration = configuration;
            _contextAccessor = contextAccessor;
            _db = db;
            _re = re;
            _logins = logins.ToList();
            _client = client;
            _mytoken = mytoken;
            _messagecode = messagecode;
            _permission = permission;
            _mathpix = mathpix;
            _ipAddressRecord = ipAddressRecord;
        }

        /// <summary>
        /// 用客户端存储的mytoken登录
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("LoginByMyToken")]
        public IResult LoginByMyToken(MyTokenRequest request)
        {
            try
            {
                Client client = _logins[0].Login(request.mytoken);
                if (client.Status == Client.ClientStatus.normal.ToString())
                {
                    ClientMathpix cm = _mathpix.GetTime(client.Id);
                    int defaulttime = _mathpix.GetDefaultTime(client.Id)[0];
                    Dictionary<string, string> dic_times = new()
                    {
                        { "current", cm.Times.ToString() },
                        { "max", defaulttime.ToString() },
                        { "private", cm.PrivateTimes.ToString() }
                    };
                    _re.result = IResult.ResultType.success;
                    _re.detail = new Dictionary<string, string>
                    {
                        { MyResponse.Key.userinfo.ToString(),JsonConvert.SerializeObject(client) },
                        { MyResponse.Key.mathpixtime.ToString(),JsonConvert.SerializeObject(dic_times)},
                        { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(client.Id)}
                    };
                }
                else
                {
                    _re.result = IResult.ResultType.fail;
                    _re.detail = new Dictionary<string, string>
                    {
                        { MyResponse.Key.errinfo.ToString(),MyException.UserIsNotExist() }
                    };
                }
                return _re;
            }
            catch (Exception ex)
            {
                return _re.SetFail(MethodBase.GetCurrentMethod().Name, ex.Message);
            }
        }

        /// <summary>
        /// 用账号密码登录
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("LoginByAccount")]
        public IResult LoginByAccount(AccountLoginRequest request)
        {
            try
            {
                Client client = _logins[1].Login(request.loginname, request.password);
                if (client.Status == Client.ClientStatus.unregistered.ToString())
                {
                    _re.result = IResult.ResultType.fail;
                    _re.detail = new Dictionary<string, string>
                    {
                        { MyResponse.Key.errinfo.ToString(),MyException.UserIsNotExist()}
                    };
                    return _re;
                }
                if (client.Status == Client.ClientStatus.normal.ToString())
                {
                    List<Permission> permissions = _permission.GetPermission(client.Id);
                    _re.result = IResult.ResultType.success;
                    _re.detail = new Dictionary<string, string>
                    {
                         { MyResponse.Key.userinfo.ToString(),JsonConvert.SerializeObject(client) },
                         { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(client.Id)}
                    };
                }
                else
                {
                    _re.result = IResult.ResultType.fail;
                    _re.detail = new Dictionary<string, string>
                    {
                        { MyResponse.Key.errinfo.ToString(),MyException.UserStatusWrong(JsonConvert.SerializeObject(client))}
                    };
                }
                return _re;
            }
            catch (Exception ex)
            {
                return _re.SetFail(MethodBase.GetCurrentMethod().Name, ex.Message);
            }
        }

        /// <summary>
        /// 注册新用户
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("RegByAccount")]
        public IResult RegByAccount(AccountRegRequest request)
        {
            try
            {
                Client client = new()
                {
                    Username = request.username,
                    Password = request.password,
                    Tel = request.tel,
                    Mail = request.mail,
                    Regfrom = Client.RegFrom.account.ToString()
                };
                client = _client.Add(client);
                _permission.AddRole(client.Id, Role.RoleType.basic.GetHashCode());//给新用户赋予默认角色
                _ipAddressRecord.RecordIPAddress(_contextAccessor, client.Id.ToString(), client.Regfrom, request.equiptype);//记载用“账号密码”方式注册的用户IP
                _re.result = IResult.ResultType.success;
                _re.detail = new Dictionary<string, string>
                {
                    { MyResponse.Key.userinfo.ToString(),JsonConvert.SerializeObject(client) },
                    { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(client.Id)}
                };
                return _re;
            }
            catch (Exception ex)
            {
                return _re.SetFail(MethodBase.GetCurrentMethod().Name, ex.Message);
            }
        }

        /// <summary>
        /// 修改用户信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("UpdateUser")]
        public IResult UpdateUser(ClientUpdateRequest request)
        {
            int id;
            string tel;
            try
            {
                id = _mytoken.ValidateMyToken(request.mytoken);
            }
            catch (Exception ex)
            {
                return _re.SetFail(MethodBase.GetCurrentMethod().Name, ex.Message);
            }
            if (request.code == string.Empty)
            {
                try
                {
                    Client client = new()
                    {
                        Id = id,
                        Username = string.Empty,
                        Password = string.Empty,
                        Tel = string.Empty,
                        Mail = string.Empty,
                        Wechat = string.Empty,
                        Qq = string.Empty,
                        Weibo = string.Empty,
                        Portrait = request.Portrait,
                        Nickname = request.Nickname
                    };
                    client = _client.Update(client);
                    _re.result = IResult.ResultType.success;
                    _re.detail = new Dictionary<string, string>
                    {
                        { MyResponse.Key.userinfo.ToString(),JsonConvert.SerializeObject(client) },
                        { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(id)}
                    };
                    return _re;
                }
                catch (Exception ex)
                {
                    _re.result = IResult.ResultType.fail;
                    _re.detail = new Dictionary<string, string>
                    {
                        { MyResponse.Key.errinfo.ToString(),ex.Message },
                        { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(id)}
                    };
                    return _re;
                }
            }
            else
            {
                try
                {
                    tel = _messagecode.Identity(id, request.code, request.Tel);
                }
                catch (Exception ex)
                {
                    _re.result = IResult.ResultType.fail;
                    _re.detail = new Dictionary<string, string>
                {
                    { MyResponse.Key.errinfo.ToString(),ex.Message },
                    { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(id)}
                };
                    return _re;
                }
                try
                {
                    Client client = new()
                    {
                        Id = id,
                        Username = request.Username,
                        Password = request.Password,
                        Tel = request.Tel,
                        Mail = request.Mail,
                        Wechat = request.Wechat,
                        Qq = request.Qq,
                        Weibo = request.Weibo,
                        Portrait = request.Portrait,
                        Nickname = request.Nickname
                    };
                    client = _client.Update(client);
                    _re.result = IResult.ResultType.success;
                    _re.detail = new Dictionary<string, string>
                {
                    { MyResponse.Key.userinfo.ToString(),JsonConvert.SerializeObject(client) },
                    { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(id)}
                };
                    _messagecode.ClearVerifyCode(tel);
                    return _re;
                }
                catch (Exception ex)
                {
                    _re.result = IResult.ResultType.fail;
                    _re.detail = new Dictionary<string, string>
                {
                    { MyResponse.Key.errinfo.ToString(),ex.Message },
                    { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(id)}
                };
                    return _re;
                }
            }

        }

        /// <summary>
        /// 删除用户
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("RemoveUser")]
        public IResult RemoveUser(ClientRemoveRequest request)
        {
            int id;
            string tel;
            try
            {
                id = _mytoken.ValidateMyToken(request.mytoken);
            }
            catch (Exception ex)
            {
                return _re.SetFail(MethodBase.GetCurrentMethod().Name, ex.Message);
            }
            try
            {
                tel = _messagecode.Identity(id, request.code);
            }
            catch (Exception ex)
            {
                _re.result = IResult.ResultType.fail;
                _re.detail = new Dictionary<string, string>
                {
                    { MyResponse.Key.errinfo.ToString(),ex.Message },
                    { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(id)}
                };
                return _re;
            }
            try
            {
                _client.Remove(id);
                _re.result = IResult.ResultType.success;
                _re.detail = new Dictionary<string, string>
                {
                    {MyResponse.Key.info.ToString(),MyInfo.RemoveSuccess(id.ToString())}
                };
                _messagecode.ClearVerifyCode(tel);
                return _re;
            }
            catch (Exception ex)
            {
                _re.result = IResult.ResultType.fail;
                _re.detail = new Dictionary<string, string>
                {
                    { MyResponse.Key.errinfo.ToString(),ex.Message },
                    { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(id)}
                };
                return _re;
            }
        }

        /// <summary>
        /// 微信登录
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("LoginByWX")]
        public IResult LoginByWX(WXCodeLoginRequest request)
        {
            try
            {
                Client client = _logins[2].Login(request.code);
                if (client.Status == Client.ClientStatus.unregistered.ToString())
                {
                    client.SetDefaultUsnameAndPsword();
                    client.Regfrom = Client.RegFrom.wx.ToString();
                    client = _client.Add(client);
                    _permission.AddRole(client.Id, Role.RoleType.basic.GetHashCode());//给新用户赋予默认角色
                    _ipAddressRecord.RecordIPAddress(_contextAccessor, client.Id.ToString(), client.Regfrom, request.equiptype);//记载用“账号密码”方式注册的用户IP
                    _re.result = IResult.ResultType.success;
                    _re.detail = new Dictionary<string, string>
                    {
                        { MyResponse.Key.userinfo.ToString(),JsonConvert.SerializeObject(client) },
                        { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(client.Id)}
                    };
                }
                else if (client.Status == Client.ClientStatus.normal.ToString())
                {
                    _re.result = IResult.ResultType.success;
                    _re.detail = new Dictionary<string, string>
                    {
                        { MyResponse.Key.userinfo.ToString(),JsonConvert.SerializeObject(client) },
                        { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(client.Id)}
                    };
                }
                else
                {
                    _re.result = IResult.ResultType.fail;
                    _re.detail = new Dictionary<string, string>
                    {
                        { MyResponse.Key.errinfo.ToString(),MyException.UserStatusWrong(JsonConvert.SerializeObject(client))}
                    };
                }
                return _re;
            }
            catch (Exception ex)
            {
                return _re.SetFail(MethodBase.GetCurrentMethod().Name, ex.Message);
            }
        }

        /// <summary>
        /// 新绑定微信
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("WXBind")]
        public IResult WXBind(WXBindRequest request)
        {
            int id;
            string wechat;
            try
            {
                id = _mytoken.ValidateMyToken(request.mytoken);
            }
            catch (Exception ex)
            {
                return _re.SetFail(MethodBase.GetCurrentMethod().Name, ex.Message);
            }
            try
            {
                Client client = _logins[2].Login(request.code);
                if (client.Status == Client.ClientStatus.unregistered.ToString())
                {
                    wechat = client.Wechat;
                }
                else if (client.Status == Client.ClientStatus.normal.ToString())
                {
                    throw new Exception(MyException.WeChatAlreadyExist());
                }
                else
                {
                    _re.result = IResult.ResultType.fail;
                    _re.detail = new Dictionary<string, string>
                    {
                        { MyResponse.Key.errinfo.ToString(),MyException.UserStatusWrong(JsonConvert.SerializeObject(client))},
                         { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(client.Id)}
                    };
                    return _re;
                }
            }
            catch (Exception ex)
            {
                _re.result = IResult.ResultType.fail;
                _re.detail = new Dictionary<string, string>
                    {
                        { MyResponse.Key.errinfo.ToString(),ex.Message },
                        { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(id)}
                    };
                return _re;
            }
            try
            {
                Client client = new()
                {
                    Id = id,
                    Username = string.Empty,
                    Password = string.Empty,
                    Tel = string.Empty,
                    Mail = string.Empty,
                    Wechat = wechat,
                    Qq = string.Empty,
                    Weibo = string.Empty,
                    Portrait = string.Empty,
                    Nickname = string.Empty
                };
                client = _client.Update(client);
                _re.result = IResult.ResultType.success;
                _re.detail = new Dictionary<string, string>
                    {
                        { MyResponse.Key.userinfo.ToString(),JsonConvert.SerializeObject(client) },
                        { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(id)}
                    };
                return _re;
            }
            catch (Exception ex)
            {
                _re.result = IResult.ResultType.fail;
                _re.detail = new Dictionary<string, string>
                    {
                        { MyResponse.Key.errinfo.ToString(),ex.Message },
                        { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(id)}
                    };
                return _re;
            }
        }

        /// <summary>
        /// 短信验证码登录
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("LoginByMessage")]
        public IResult LoginByMessage(MessageCodeLoginRequest request)
        {
            try
            {
                Client client = _logins[3].Login(request.tel, request.code);
                if (client.Status == Client.ClientStatus.unregistered.ToString())
                {
                    client.SetDefaultUsnameAndPsword();
                    client.Regfrom = Client.RegFrom.tel.ToString();
                    _client.Add(client);
                    _permission.AddRole(client.Id, Role.RoleType.basic.GetHashCode());//给新用户赋予默认角色
                    _ipAddressRecord.RecordIPAddress(_contextAccessor, client.Id.ToString(), client.Regfrom, request.equiptype);//记载用“账号密码”方式注册的用户IP
                }
                if (client.Status == Client.ClientStatus.normal.ToString())
                {
                    _re.result = IResult.ResultType.success;
                    _re.detail = new Dictionary<string, string>
                    {
                        { MyResponse.Key.userinfo.ToString(),JsonConvert.SerializeObject(client) },
                        { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(client.Id)}
                    };
                    _messagecode.ClearVerifyCode(client.Tel);
                }
                else
                {
                    _re.result = IResult.ResultType.fail;
                    _re.detail = new Dictionary<string, string>
                    {
                        { MyResponse.Key.errinfo.ToString(),MyException.UserStatusWrong(JsonConvert.SerializeObject(client))}
                    };
                }
                return _re;
            }
            catch (Exception ex)
            {
                return _re.SetFail(MethodBase.GetCurrentMethod().Name, ex.Message);
            }
        }

        /// <summary>
        /// 发送短信验证码
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("SendMessageCode_Identity")]
        public IResult SendMessageCode_Identity(SendIdentityMessageCodeRequest request)
        {

            Client client;
            try
            {
                client = _logins[0].Login(request.mytoken);
            }
            catch (Exception ex)
            {
                return _re.SetFail(MethodBase.GetCurrentMethod().Name, ex.Message);
            }
            if (string.IsNullOrEmpty(client.Tel))
            {
                _re.result = IResult.ResultType.fail;
                _re.MethodName = MethodBase.GetCurrentMethod().Name;
                _re.detail = new Dictionary<string, string>
                    {
                        { MyResponse.Key.errinfo.ToString(),MyException.HaveNotBindTel() }
                    };
                return _re;
            }
            try
            {
                AliyunMessgeRespons aliyunMessageResult = _messagecode.SendVerifyCode(client.Tel, _configuration.GetSection("AliYun").GetSection("Message").GetSection("TemplateCode_Identity").Value);
                switch (aliyunMessageResult.Code)
                {
                    case "OK":
                        _re.result = IResult.ResultType.success;
                        _re.detail = new Dictionary<string, string>
                        {
                            { MyResponse.Key.info.ToString(),MyInfo.SendVerifyCodeSucess(client.Tel)},
                            { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(client.Id)}
                        };
                        break;
                    case "isv.BUSINESS_LIMIT_CONTROL":
                        _re.result = IResult.ResultType.fail;
                        _re.detail = new Dictionary<string, string>
                        {
                            { MyResponse.Key.errinfo.ToString(),MyException.SendVerifyCodeFrequence()},
                            { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(client.Id)}
                        };
                        break;
                    default:
                        _re.result = IResult.ResultType.fail;
                        _re.detail = new Dictionary<string, string>
                        {
                            { MyResponse.Key.errinfo.ToString(),aliyunMessageResult.Message},
                            { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(client.Id)}
                        };
                        break;
                }
                return _re;
            }
            catch (Exception ex)
            {
                _re.result = IResult.ResultType.fail;
                _re.detail = new Dictionary<string, string>
                {
                    { MyResponse.Key.errinfo.ToString(),ex.Message },
                    { MyResponse.Key.token.ToString(),_mytoken.GetNewMyToken(client.Id)}
                };
                return _re;
            }
        }

        /// <summary>
        /// 发送短信验证码
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("SendMessageCode_Login")]
        public IResult SendMessageCode_Login(SendLoginMessageCodeRequest request)
        {
            try
            {
                AliyunMessgeRespons aliyunMessageResult = _messagecode.SendVerifyCode(request.tel, _configuration.GetSection("AliYun").GetSection("Message").GetSection("TemplateCode_Login").Value);
                switch (aliyunMessageResult.Code)
                {
                    case "OK":
                        _re.result = IResult.ResultType.success;
                        _re.detail = new Dictionary<string, string>
                        {
                            { MyResponse.Key.info.ToString(),MyInfo.SendVerifyCodeSucess(request.tel)}
                        };
                        break;
                    case "isv.BUSINESS_LIMIT_CONTROL":
                        _re.result = IResult.ResultType.fail;
                        _re.detail = new Dictionary<string, string>
                        {
                            { MyResponse.Key.errinfo.ToString(),MyException.SendVerifyCodeFrequence()}
                        };
                        break;
                    default:
                        _re.result = IResult.ResultType.fail;
                        _re.detail = new Dictionary<string, string>
                        {
                            { MyResponse.Key.errinfo.ToString(),aliyunMessageResult.Message}
                        };
                        break;
                }
                return _re;
            }
            catch (Exception ex)
            {
                return _re.SetFail(MethodBase.GetCurrentMethod().Name, ex.Message);
            }
        }

        /// <summary>
        /// 一分钟禁止发送剩余秒数
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("GetRemainTime")]
        public IResult GetRemainTime(GetMessageCodeRemainTimeRequest request)
        {
            try
            {
                int time = _messagecode.GetRemainTime(request.tel);
                _re.result = IResult.ResultType.success;
                _re.detail = new Dictionary<string, string>
                {
                    { MyResponse.Key.remaintime.ToString(),time.ToString()}
                };
                return _re;
            }
            catch (Exception ex)
            {
                return _re.SetFail(MethodBase.GetCurrentMethod().Name, ex.Message);
            }
        }
    }
}
