using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using LaTeXAPI.Models;

namespace LaTeXAPI.Interface
{
    public interface IPermission
    {
        /// <summary>
        /// 赋予用户角色
        /// </summary>
        /// <param name="clientid">用户id</param>
        /// <param name="roleid">角色id</param>
        public void AddRole(int clientid, int roleid);

        /// <summary>
        /// 剥夺用户的角色
        /// </summary>
        /// <param name="clientid">用户id</param>
        /// <param name="roleid">角色id</param>
        public void RemoveRole(int clientid, int roleid);

        /// <summary>
        /// 按照用户id获取其权限列表
        /// </summary>
        /// <param name="clientid">用户id</param>
        /// <returns></returns>
        public List<Permission> GetPermission(int clientid);
    }
}
