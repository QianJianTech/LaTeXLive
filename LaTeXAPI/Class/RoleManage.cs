using System;
using System.Collections.Generic;
using System.Text;

using LaTeXAPI.Interface;
using LaTeXAPI.Models;

using Microsoft.Extensions.Configuration;

using ToolsOfPanda.Interface;
namespace LaTeXAPI.Class
{
    public class RoleManage : IPermission
    {

        private IConfiguration _configuration { get; }
        private IDBTool _db { get; }

        private latexliveContext _dbcontext { get; }

        private RoleManage() { }

        public RoleManage(IConfiguration configuration, IDBTool db, latexliveContext context)
        {
            _configuration = configuration;
            _db = db;
            _dbcontext = context;
        }

        /// <summary>
        /// 赋予用户角色
        /// </summary>
        /// <param name="clientid">用户id</param>
        /// <param name="roleid">角色id</param>
        public void AddRole(int clientid, int roleid)
        {
            if (!IsRoleExist(clientid, roleid))
            {
                string sqlstr = "insert into client_role (client_id,role_id) values (@client_id,@role_id)";
                Dictionary<string, object> parm = new()
                {
                    { "@client_id", clientid },
                    { "@role_id", roleid }
                };
                _db.Change(sqlstr, parm);
            }
        }

        /// <summary>
        /// 剥夺用户的角色(角色id默认值剥夺所有角色，即删除用户)
        /// </summary>
        /// <param name="clientid">用户id</param>
        /// <param name="roleid">角色id</param>
        public void RemoveRole(int clientid, int roleid = 0)
        {
            string sqlstr;
            Dictionary<string, object> parm;
            if (roleid != 0)
            {
                sqlstr = "delete from client_role where client_id=@client_id and role_id=@role_id";
                parm = new()
                {
                    { "@client_id", clientid },
                    { "@role_id", roleid }
                };
            }
            else
            {
                sqlstr = "delete from client_role where client_id=@client_id";
                parm = new()
                {
                    { "@client_id", clientid }
                };
            }
            _db.Change(sqlstr, parm);
        }

        /// <summary>
        /// 按照用户id获取其权限列表
        /// </summary>
        /// <param name="clientid">用户id</param>
        /// <returns></returns>
        public List<Permission> GetPermission(int clientid)
        {
            StringBuilder sqlsb = new();
            sqlsb.Append("select * from permission p ");
            sqlsb.Append("inner join role_permission rp ");
            sqlsb.Append("on p.id=rp.permission_id ");
            sqlsb.Append("inner join client_role cr ");
            sqlsb.Append("on rp.role_id=cr.role_id ");
            sqlsb.Append("where cr.client_id=@client_id");
            string sqlstr = sqlsb.ToString();
            Dictionary<string, object> parm = new()
            {
                { "@client_id", clientid }
            };
            List<Permission> list= _db.GetListByStream<Permission>(sqlstr, parm);
            if (list.Count > 0)
            {
                return list;
            }
            else
            {
                throw new Exception(MyException.PermissionIsNotFound());
            }
        }

        /// <summary>
        /// 用户是否拥有某角色
        /// </summary>
        /// <param name="clientid">用户id</param>
        /// <param name="roleid">角色id</param>
        /// <returns></returns>
        private bool IsRoleExist(int clientid, int roleid)
        {
            string sqlstr = "select count(id) from client_role where client_id=@client_id and role_id=@role_id";
            Dictionary<string, object> parm = new()
            {
                { "@client_id", clientid },
                { "@role_id", roleid }
            };
            return Convert.ToInt32(_db.GetFirst(sqlstr, parm)) > 0;
        }
    }
}
