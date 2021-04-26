using System;
using System.Collections.Generic;
using System.Linq;

using LaTeXAPI.Interface;
using LaTeXAPI.Models;

using Microsoft.Extensions.Configuration;

using ToolsOfPanda.Interface;

namespace LaTeXAPI.Class
{
    public class MathPix : IMathPix
    {
        private IConfiguration _configuration { get; }

        private IDBTool _db { get; }

        private latexliveContext _dbcontext { get; }

        private IHttpTool _http { get; }

        private IPermission _permission { get; }

        private string AppId { get; }

        private string AppKey { get; }

        private string Url { get; }

        private MathPix() { }

        /// <summary>
        /// mathpix操作接口实例化
        /// </summary>
        /// <param name="configuration"></param>
        /// <param name="db"></param>
        /// <param name="context"></param>
        /// <param name="http"></param>
        /// <param name="permission"></param>
        public MathPix(IConfiguration configuration, IDBTool db, latexliveContext context, IHttpTool http, IPermission permission)
        {
            _configuration = configuration;
            _db = db;
            _dbcontext = context;
            _http = http;
            _permission = permission;
            AppId = _configuration.GetSection("Mathpix").GetSection("AppID").Value;
            AppKey = _configuration.GetSection("Mathpix").GetSection("AppKey").Value;
            Url = _configuration.GetSection("Mathpix").GetSection("Url").Value;
        }

        /// <summary>
        /// 在午夜0点按照用户权限重置mathpix调用次数
        /// </summary>
        public void ReSetAllTime()
        {
            List<ClientMathpix> clientMathpixes = GetAllClientAndPermission();
            foreach (var clientMathpix in clientMathpixes)
            {
                string sqlstr = "update client_mathpix set times=@time where client_id=@id";
                Dictionary<string, object> parm = new()
                {
                    { "@time", clientMathpix.Times },
                    { "@id", clientMathpix.ClientId }
                };
                _db.Change(sqlstr, parm);
            }

        }

        /// <summary>
        /// 获取所有用户权限列表
        /// </summary>
        /// <returns></returns>
        private List<ClientMathpix> GetAllClientAndPermission()
        {
            List<ClientMathpix> rtnlist = new();
            List<Permission> permissions = _dbcontext.Permissions.Where(per => per.Name == Permission.PermissionName.mathpix_api.ToString()).ToList();
            foreach (var permission in permissions)
            {
                List<RolePermission> rolePermissions = _dbcontext.RolePermissions.Where(rp => rp.PermissionId == permission.Id).ToList();
                foreach (var rope in rolePermissions)
                {
                    List<ClientRole> clientRoles = _dbcontext.ClientRoles.Where(cr => cr.RoleId == rope.RoleId).ToList();
                    foreach (var clro in clientRoles)
                    {
                        rtnlist.Add(new ClientMathpix()
                        {
                            ClientId = clro.ClientId,
                            Times = Convert.ToInt32(permission.Value)
                        });
                    }
                }
            }
            return rtnlist;
        }

        /// <summary>
        /// 请求mathpix接口
        /// </summary>
        /// <param name="clientid">用户id</param>
        /// <param name="src">base64码流</param>
        /// <returns></returns>
        public string RequireMathPix(int clientid, string src)
        {
            ClientMathpix cm = GetTime(clientid);
            if (cm.Times > 0)
            {
                cm.Times -= 1;
                return PostToMathPixAPI(src, cm, SetTime);
            }
            else
            {
                if (cm.PrivateTimes > 0)
                {
                    cm.PrivateTimes -= 1;
                    return PostToMathPixAPI(src, cm, SetTime);
                }
                else
                {
                    throw new Exception(MyException.MathPixRunOutOf(clientid.ToString()));
                }
            }
        }

        /// <summary>
        /// 获取用户当前剩余次数
        /// </summary>
        /// <param name="clientid"></param>
        /// <returns></returns>
        public ClientMathpix GetTime(int clientid)
        {
            List<ClientMathpix> list = _dbcontext.ClientMathpixes.Where(cm => cm.ClientId == clientid).ToList();
            if (list.Count == 1)
            {
                return list[0];
            }
            else
            {
                if (list.Count < 1)
                {
                    return AddNewTimeRecord(clientid);
                }
                else
                {
                    throw new Exception(MyException.RecordRepeat(clientid.ToString()));
                }
            }
        }

        /// <summary>
        /// 设置更新次数
        /// </summary>
        /// <param name="clientMathpix"></param>
        private void SetTime(ClientMathpix clientMathpix)
        {
            string sqlstr = "update client_mathpix set times=@time,private_times=@ptime where client_id=@cid";
            Dictionary<string, object> parm = new()
            {
                { "@time", clientMathpix.Times },
                { "@ptime", clientMathpix.PrivateTimes },
                { "@cid", clientMathpix.ClientId }
            };
            _db.Change(sqlstr, parm);
        }

        /// <summary>
        /// 增加新的一条次数记录
        /// </summary>
        /// <param name="clientid"></param>
        private ClientMathpix AddNewTimeRecord(int clientid)
        {
            int[] count = GetDefaultTime(clientid);
            string sqlstr = "insert into client_mathpix (client_id,times,private_times) values (@cid,@time,@ptime)";
            Dictionary<string, object> parm = new()
            {
                { "@cid", clientid },
                { "@time", count[0] },
                { "@ptime", count[1] }
            };
            _db.Change(sqlstr, parm, out long lastid);
            return new ClientMathpix()
            {
                Id = Convert.ToInt32(lastid),
                ClientId = clientid,
                Times = count[0],
                PrivateTimes = count[1]
            };
        }

        /// <summary>
        /// 获得用户默认次数
        /// </summary>
        /// <param name="clientid"></param>
        /// <returns></returns>
        public int[] GetDefaultTime(int clientid)
        {
            int[] val = new int[2];
            List<Permission> permissions = _permission.GetPermission(clientid);
            foreach (var item in permissions)
            {
                if (item.Name == Permission.PermissionName.mathpix_api.ToString())
                {
                    val[0] = Convert.ToInt32(item.Value);
                }
                if (item.Name == Permission.PermissionName.new_private.ToString())
                {
                    val[1] = Convert.ToInt32(item.Value);
                }
            }
            return val;
        }

        /// <summary>
        /// 向mathpix接口请求识别
        /// </summary>
        /// <param name="src"></param>
        /// <param name="action"></param>
        /// <param name="clientMathpix"></param>
        /// <returns></returns>
        private string PostToMathPixAPI(string src, ClientMathpix clientMathpix, Action<ClientMathpix> action)
        {
            Dictionary<string, string> header = new()
            {
                { "app_id", AppId },
                { "app_key", AppKey }
            };
            Dictionary<string, string> body = new()
            {
                { "src", src }
            };
            string rtnstr = _http.PostFromWeb(Url, header, body).Result;
            action.Invoke(clientMathpix);
            return rtnstr;
        }

    }
}
