using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

using LaTeXAPI.Class;
using LaTeXAPI.Interface;
using LaTeXAPI.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

using ToolsOfPanda.Interface;

namespace LaTeXAPI
{
    [Route("api/[controller]")]
    [ApiController]
    public class MathPixController : ControllerBase
    {
        private IConfiguration _configuration { get; }

        private IResult _re { get; }

        private List<ILogin> _logins { get; }

        private IMyToken _mytoken { get; }

        private IPermission _permission { get; }

        private IMathPix _mathpix { get; }

        public MathPixController(IConfiguration configuration, IDBTool db, latexliveContext context, IResult re, IEnumerable<ILogin> logins, IMyToken mytoken, IPermission permission, IMathPix mathpix)
        {
            _configuration = configuration;
            _re = re;
            _logins = logins.ToList();
            _mytoken = mytoken;
            _permission = permission;
            _mathpix = mathpix;
        }

        /// <summary>
        /// 从MathPix接口获取LaTeX语句
        /// </summary>
        /// <returns></returns>
        [HttpPost("GetLaTexFromMathPix")]
        public IResult GetLaTexFromMathPix(GetLaTexFromMathPixRequest request)
        {
            int id;
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
                string str = _mathpix.RequireMathPix(id, request.src);
                _re.result = IResult.ResultType.success;
                _re.detail = new Dictionary<string, string>
                {
                    { MyResponse.Key.info.ToString(),str },
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
        /// 手动操作重置所有会员的每日接口调用次数
        /// </summary>
        /// <returns></returns>
        [HttpGet("ResetHandOperation")]
        public IResult ResetHandOperation(string password)
        {
            string _password = _configuration.GetSection("Mathpix").GetSection("Password").Value;
            if (password != _password)
            {
                _re.result = IResult.ResultType.fail;
                _re.detail = new Dictionary<string, string>
                {
                    {MyResponse.Key.info.ToString(),MyInfo.ResetPasswordWrong() }
                };
                return _re;
            }
            try
            {
                _mathpix.ReSetAllTime();
                _re.result = IResult.ResultType.success;
                _re.detail = new Dictionary<string, string>
                {
                    {MyResponse.Key.info.ToString(),MyInfo.ResetSuccess() }
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
