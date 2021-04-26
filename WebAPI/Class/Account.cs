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
    /// 账号密码登录类
    /// </summary>
    public class Account : ILogin, IClient
    {
        private IConfiguration _configuration { get; }
        private IDBTool _db { get; }

        private latexliveContext _dbcontext { get; }

        private Account() { }

        /// <summary>
        /// 账号密码登录类实例化
        /// </summary>
        public Account(IConfiguration configuration, IDBTool db, latexliveContext context)
        {
            _configuration = configuration;
            _db = db;
            _dbcontext = context;
        }

        /// <summary>
        /// 登录名类型
        /// </summary>
        enum LoginType
        {
            username,
            tel,
            mail,
            wechat,
            qq,
            weibo,
            unknown
        }

        /// <summary>
        /// 通过账号登录
        /// </summary>
        /// <param name="loginname"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public Client Login(string loginname, string password)
        {
            if (string.IsNullOrEmpty(loginname))
            {
                throw new Exception(MyException.LoginNameEmpty());
            }
            LoginType type = SwitchLoginType(loginname);
            if (type == LoginType.unknown)
            {
                return new Client()
                {
                    Status = Client.ClientStatus.unregistered.ToString(),
                    Regfrom = Client.RegFrom.account.ToString()
                };
            }
            ValidaityLoginname(type, loginname);
            ValidaityPassword(password);
            if (AlreadyExist(type, loginname))
            {
                string sqlstr_member = type.ToString();
                string sqlstr = "select * from client where " + sqlstr_member + "=@" + sqlstr_member + " and password=@password and status=@status";
                Dictionary<string, object> parm = new()
                {
                    { "@" + sqlstr_member, loginname },
                    { "@password", password },
                    { "@status", Client.ClientStatus.normal.ToString() }
                };
                List<Client> clients = _db.GetListByStream<Client>(sqlstr, parm);
                if (clients.Count == 1)
                {
                    return clients[0].HidePassword();
                }
                else if (clients.Count < 1)
                {
                    throw new Exception(MyException.PasswordWrong());
                }
                else
                {
                    throw new Exception(MyException.RecordRepeat(JsonConvert.SerializeObject(clients)));
                }
            }
            else
            {
                return new Client();
            }
        }

        /// <summary>
        /// 增加新用户
        /// </summary>
        /// <param name="client"></param>
        /// <returns></returns>
        public Client Add(Client client)
        {
            ValidaityLoginname(LoginType.username, client.Username);
            ValidaityLoginname(LoginType.tel, client.Tel);
            ValidaityLoginname(LoginType.mail, client.Mail);
            ValidaityPassword(client.Password);
            if (AlreadyExist(LoginType.username, client.Username))
            {
                throw new Exception(MyException.UsernameAlreadyExist());
            }
            if (AlreadyExist(LoginType.tel, client.Tel))
            {
                throw new Exception(MyException.TelAlreadyExist());
            }
            if (AlreadyExist(LoginType.mail, client.Mail))
            {
                throw new Exception(MyException.MailAlreadExist());
            }
            if (AlreadyExist(LoginType.wechat, client.Wechat))
            {
                throw new Exception(MyException.WeChatAlreadyExist());
            }
            if (AlreadyExist(LoginType.qq, client.Qq))
            {
                throw new Exception(MyException.QQAlreadyExist());
            }
            if (AlreadyExist(LoginType.weibo, client.Weibo))
            {
                throw new Exception(MyException.WeiBoAlreadyExist());
            }
            client.Nickname = client.Nickname == string.Empty ? "用户" + Common.GetNowTimeStamp().ToString() + Common.GetRandomCode(3).ToString() : client.Nickname;
            client.Portrait = client.Portrait == string.Empty ? _configuration.GetSection("AliYun").GetSection("OSS").GetSection("Url_Portrait").Value + "default" + Common.GetRandomCode(1) + ".jpg" : client.Portrait;
            string sqlstr = "insert into client (username,password,tel,mail,wechat,qq,weibo,portrait,nickname,regfrom,status) values (@username,@password,@tel,@mail,@wechat,@qq,@weibo,@portrait,@nickname,@regfrom,@status)";
            Dictionary<string, object> parm = new()
            {
                { "@username", client.Username },
                { "@password", client.Password },
                { "@tel", client.Tel },
                { "@mail", client.Mail },
                { "@wechat", client.Wechat },
                { "@qq", client.Qq },
                { "@weibo", client.Weibo },
                { "@portrait", client.Portrait },
                { "@nickname", client.Nickname },
                { "@regfrom", client.Regfrom },
                { "@status", Client.ClientStatus.normal.ToString() }
            };
            _db.Change(sqlstr, parm, out long lastid);
            return client.SetId(Convert.ToInt32(lastid)).SetStatusNormal().HidePassword();
        }

        /// <summary>
        /// 修改用户信息
        /// </summary>
        /// <param name="new_client"></param>
        /// <returns></returns>
        public Client Update(Client new_client)
        {
            Client old_client = GetUserInfoById(new_client.Id);
            if (new_client.Username == old_client.Username || new_client.Username == string.Empty)
            {
                new_client.Username = old_client.Username;
            }
            else
            {
                ValidaityLoginname(LoginType.username, new_client.Username);
                if (AlreadyExist(LoginType.username, new_client.Username))
                {
                    throw new Exception(MyException.UsernameAlreadyExist());
                }
            }
            if (new_client.Password == old_client.Password || new_client.Password == string.Empty)
            {
                new_client.Password = old_client.Password;
            }
            else
            {
                ValidaityPassword(new_client.Password);
            }
            if (new_client.Tel == old_client.Tel || new_client.Tel == string.Empty)
            {
                new_client.Tel = old_client.Tel;
            }
            else if (new_client.Tel == Client.Special.ForceEmpty.ToString())
            {
                new_client.Tel = string.Empty;
            }
            else
            {
                ValidaityLoginname(LoginType.tel, new_client.Tel);
                if (AlreadyExist(LoginType.tel, new_client.Tel))
                {
                    throw new Exception(MyException.TelAlreadyExist());
                }
            }

            if (new_client.Mail == old_client.Mail || new_client.Mail == string.Empty)
            {
                new_client.Mail = old_client.Mail;
            }
            else if (new_client.Mail == Client.Special.ForceEmpty.ToString())
            {
                new_client.Mail = string.Empty;
            }
            else
            {
                ValidaityLoginname(LoginType.mail, new_client.Mail);
                if (AlreadyExist(LoginType.mail, new_client.Mail))
                {
                    throw new Exception(MyException.MailAlreadExist());
                }
            }

            if (new_client.Wechat == old_client.Wechat || new_client.Wechat == string.Empty)
            {
                new_client.Wechat = old_client.Wechat;
            }
            else if (new_client.Wechat == Client.Special.ForceEmpty.ToString())
            {
                new_client.Wechat = string.Empty;
            }
            else
            {
                if (AlreadyExist(LoginType.wechat, new_client.Wechat))
                {
                    throw new Exception(MyException.WeChatAlreadyExist());
                }
            }
            if (new_client.Qq == old_client.Qq || new_client.Qq == string.Empty)
            {
                new_client.Qq = old_client.Qq;
            }
            else if (new_client.Qq == Client.Special.ForceEmpty.ToString())
            {
                new_client.Qq = string.Empty;
            }
            else
            {
                if (AlreadyExist(LoginType.qq, new_client.Qq))
                {
                    throw new Exception(MyException.QQAlreadyExist());
                }
            }
            if (new_client.Weibo == old_client.Weibo || new_client.Weibo == string.Empty)
            {
                new_client.Weibo = old_client.Weibo;
            }
            else if (new_client.Weibo == Client.Special.ForceEmpty.ToString())
            {
                new_client.Weibo = string.Empty;
            }
            else
            {
                if (AlreadyExist(LoginType.weibo, new_client.Weibo))
                {
                    throw new Exception(MyException.WeiBoAlreadyExist());
                }
            }
            if (new_client.Portrait == old_client.Portrait || new_client.Portrait == string.Empty)
            {
                new_client.Portrait = old_client.Portrait;
            }
            if (new_client.Nickname == old_client.Nickname || new_client.Nickname == string.Empty)
            {
                new_client.Nickname = old_client.Nickname;
            }
            string sqlstr = "update client set username=@username,password=@password,tel=@tel,mail=@mail,wechat=@wechat,qq=@qq,weibo=@weibo,portrait=@portrait,nickname=@nickname where id=@id and status=@status";
            Dictionary<string, object> parm = new()
            {
                { "@username", new_client.Username },
                { "@password", new_client.Password },
                { "@tel", new_client.Tel },
                { "@mail", new_client.Mail },
                { "@wechat", new_client.Wechat },
                { "@qq", new_client.Qq },
                { "@weibo", new_client.Weibo },
                { "@portrait", new_client.Portrait },
                { "@nickname", new_client.Nickname },
                { "@id", new_client.Id },
                { "@status", Client.ClientStatus.normal.ToString() }
            };
            _db.Change(sqlstr, parm);
            return new_client.HidePassword();
        }

        /// <summary>
        /// 删除用户
        /// </summary>
        /// <param name="id"></param>
        public void Remove(int id)
        {
            string sqlstr = "update client set status=@newstatus where id=@id and status=@oldstatus";
            Dictionary<string, object> parm = new()
            {
                { "@newstatus", Client.ClientStatus.cancelled.ToString() },
                { "@id", id },
                { "@oldstatus", Client.ClientStatus.normal.ToString() }
            };
            _db.Change(sqlstr, parm);
        }

        /// <summary>
        /// 判断登录类型
        /// </summary>
        /// <param name="loginname"></param>
        /// <returns></returns>
        private static LoginType SwitchLoginType(string loginname)
        {
            Regex reg_username = new(@"^[a-zA-Z0-9_]{4,16}$");
            Regex reg_tel = new(@"^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$");
            Regex reg_mail = new(@"^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$");
            if (reg_tel.IsMatch(loginname))
            {
                return LoginType.tel;
            }
            else if (reg_mail.IsMatch(loginname))
            {
                return LoginType.mail;
            }
            else if (reg_username.IsMatch(loginname))
            {
                return LoginType.username;
            }
            else
            {
                return LoginType.unknown;
            }
        }

        /// <summary>
        /// 检查登录名合法性
        /// </summary>
        /// <param name="type"></param>
        /// <param name="loginname"></param>
        private static void ValidaityLoginname(LoginType type, string loginname)
        {
            switch (type)
            {
                case LoginType.username:
                    if (string.IsNullOrEmpty(loginname))
                    {
                        throw new Exception(MyException.UsernameEmpty());
                    }
                    if (new Regex(@"^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,3-9]))\d{8}$").IsMatch(loginname))
                    {
                        throw new Exception(MyException.TelNumberCanNotBeUsername());
                    }
                    Regex reg_username = new(@"^[a-zA-Z0-9_]{4,16}$");
                    if (!reg_username.IsMatch(loginname))
                    {
                        throw new Exception(MyException.UsernameFormatWrong(loginname));
                    }
                    break;
                case LoginType.tel:
                    Regex reg_tel = new(@"^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,3-9]))\d{8}$");
                    if (!reg_tel.IsMatch(loginname) && loginname != string.Empty)
                    {
                        throw new Exception(MyException.TelFormatWrong(loginname));
                    }
                    break;
                case LoginType.mail:
                    Regex reg_mail = new(@"^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$");
                    if (!reg_mail.IsMatch(loginname) && loginname != string.Empty)
                    {
                        throw new Exception(MyException.MailFormatWrong(loginname));
                    }
                    break;
                default:
                    break;
            }
        }

        /// <summary>
        /// 检查密码合法性
        /// </summary>
        /// <param name="password"></param>
        private static void ValidaityPassword(string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                throw new Exception(MyException.PasswordEmpty());
            }
        }

        /// <summary>
        /// 登录名是否已经存在
        /// </summary>
        /// <param name="type"></param>
        /// <param name="loginname"></param>
        /// <returns></returns>
        private bool AlreadyExist(LoginType type, string loginname)
        {
            if (loginname != string.Empty)
            {
                string sqlstr = "select * from client where " + type.ToString() + "=@" + type.ToString() + " and status=@status";
                Dictionary<string, object> parm = new()
                {
                    { "@" + type.ToString(), loginname },
                    { "@status", Client.ClientStatus.normal.ToString() }
                };
                DataTable tb = _db.GetTableByStream(sqlstr, parm);
                if (tb.Rows.Count == 1)
                {
                    return true;
                }
                else if (tb.Rows.Count < 1)
                {
                    return false;
                }
                else
                {
                    throw new Exception(MyException.RecordRepeat(JsonConvert.SerializeObject(tb)));
                }
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 根据id获取用户信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private Client GetUserInfoById(int id)
        {
            List<Client> clients = _dbcontext.Clients.Where(c => c.Id == id && c.Status == Client.ClientStatus.normal.ToString()).ToList();
            if (clients.Count == 1)
            {
                return clients[0];
            }
            else if (clients.Count < 1)
            {
                return new Client()
                {
                    Status = Client.ClientStatus.unregistered.ToString()
                };
            }
            else
            {
                throw new Exception(MyException.RecordRepeat(JsonConvert.SerializeObject(clients)));
            }
        }
    }
}
