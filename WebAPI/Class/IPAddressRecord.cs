using System;
using System.IO;

using LaTeXAPI.Interface;
using LaTeXAPI.Models;
using ToolsOfPanda.Interface;

using Microsoft.AspNetCore.Http;

using System.Collections;
using System.Collections.Generic;

namespace LaTeXAPI.Class
{
    public class IPAddressRecord : IIPAddressRecord
    {
        private IDBTool _db { get; }
        private IPAddressRecord() { }
        public IPAddressRecord(IDBTool db)
        {
            _db = db;
        }

        public void RecordIPAddress(IHttpContextAccessor contextAccessor, string id, string regfrom, string equipType)
        {
            string sqlstr = "insert into ip_client (regdate,ip,client_id,client_regfrom,equiptype) values(@regdate,@ip,@client_id,@client_regfrom,@equiptype)";
            Dictionary<string, object> parm = new()
            {
                { "@regdate", GetTime() },
                { "@ip", GetIP(contextAccessor) },
                { "@client_id", id },
                { "@client_regfrom", regfrom },
                { "@equiptype", equipType }
            };
            _db.Change(sqlstr, parm);
        }

        private static string GetTime()
        {
            return DateTime.Now.ToString("yyyy-MM-dd HH:mm:sss");
        }

        private static string GetIP(IHttpContextAccessor contextAccessor)
        {
            return contextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
        }
    }
}
