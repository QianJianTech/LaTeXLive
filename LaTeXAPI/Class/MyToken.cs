using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

using LaTeXAPI.Interface;
using LaTeXAPI.Models;

using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

using ToolsOfPanda;
using ToolsOfPanda.Interface;

namespace LaTeXAPI.Class
{
    /// <summary>
    /// mytoken
    /// </summary>
    public class MyToken : ILogin, IMyToken
    {
        private IConfiguration _configuration { get; }

        private IDBTool _db { get; }

        private IRedisTool _redis { get; }

        private ITokenTool _token { get; }

        private latexliveContext _dbcontext { get; }

        private int RedisDBNum_mytoken { get; }

        private MyToken() { }

        /// <summary>
        /// 构造函数（初始化jwttool）
        /// </summary>
        public MyToken(IConfiguration configuration, IDBTool db, IRedisTool redis, ITokenTool token, latexliveContext context)
        {
            _configuration = configuration;
            _db = db;
            _redis = redis;
            _token = token;
            _dbcontext = context;
            RedisDBNum_mytoken = Convert.ToInt32(_configuration.GetSection("RedisDBNum").GetSection("MyToken").Value);
        }

        /// <summary>
        /// 通过mytoken登录
        /// </summary>
        /// <param name="token">mytoken</param>
        /// <param name="nothing">不填</param>
        /// <returns></returns>
        public Client Login(string token, string nothing)
        {
            int id = ValidateMyToken(token);
            List<Client> clients = _dbcontext.Clients.Where(c => c.Id == id && c.Status == Client.ClientStatus.normal.ToString()).ToList();
            if (clients.Count == 1)
            {
                return clients[0].HidePassword();
            }
            else if (clients.Count < 1)
            {
                return new Client();
            }
            else
            {
                throw new Exception(MyException.RecordRepeat(JsonConvert.SerializeObject(clients)));
            }
        }

        /// <summary>
        /// 通过mytoken获取id
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public int ValidateMyToken(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                throw new Exception(MyException.TokenEmpty());
            }
            try
            {
                string token_id = _token.UnEncodeToken(token)["id"];
                string redis_id;
                if (_redis.String_Exist(token, RedisDBNum_mytoken))
                {
                    redis_id = _redis.String_Get(token, RedisDBNum_mytoken);
                    if (redis_id == token_id)
                    {
                        _redis.Key_Del(token, RedisDBNum_mytoken);
                        return Convert.ToInt32(token_id);
                    }
                    else
                    {
                        _redis.Key_Del(token, RedisDBNum_mytoken);
                        throw new Exception(MyException.TokenContentIllegal(redis_id));
                    }
                }
                else
                {
                    throw new Exception(MyException.TokenExpired());
                }
               
            }
            catch
            {
                _redis.Key_Del(token, RedisDBNum_mytoken);
                throw;
            }
        }

        /// <summary>
        /// 通过Id、时间戳获得新的mytoken
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string GetNewMyToken(int id)
        {
            string str_token = _token.EncodeToken(new Dictionary<string, string> {
                { "id",id.ToString()},
                { "timestamp",Common.GetNowTimeStamp().ToString()}
            });
            _redis.String_Set(str_token, id.ToString(), RedisDBNum_mytoken, 2592000);
            return str_token;
        }
    }
}
