using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

using LaTeXAPI.Interface;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

using ToolsOfPanda.Interface;

namespace LaTeXAPI
{
    public class ExecuteAtTimeMiddleware
    {
        private readonly RequestDelegate _next;

        private IConfiguration _configuration { get; }

        private IMathPix _mathPix { get; }

        private IAliyunMessageCodeTool _message { get; }

        private readonly int[] _time = { 0, 0, 0 };

        public ExecuteAtTimeMiddleware(RequestDelegate next, IConfiguration configuration, IMathPix mathPix, IAliyunMessageCodeTool message)
        {
            _next = next;
            _configuration = configuration;
            _mathPix = mathPix;
            _message = message;
        }
        public async Task Invoke(HttpContext httpContext)
        {
            DoAtTheTime(_time[0], _time[1], _time[2]);
            await _next.Invoke(httpContext);
        }

        /// <summary>
        /// 凌晨0时执行重置
        /// </summary>
        private void DoAtTheTime(int hour = 0, int min = 0, int sec = 0)
        {
            double addseconds = hour * 3600 + min * 60 + sec;
            DateTime now = DateTime.Now;
            DateTime theTime = DateTime.Today.AddSeconds(addseconds);
            if (now > theTime)
            {
                theTime = theTime.AddDays(1.0);
            }
            int until = (int)((theTime - now).TotalMilliseconds);
            Timer timer = new(ResetAllMathPixTime);
            timer.Change(until, Timeout.Infinite);
        }

        /// <summary>
        /// 重置并回调0时执行
        /// </summary>
        private void ResetAllMathPixTime(object state)
        {
            try
            {
                _mathPix.ReSetAllTime();
                SendMessage(true);
            }
            catch (Exception)
            {
                SendMessage(false);
            }
            finally
            {
                DoAtTheTime(_time[0], _time[1], _time[2]);
            }
        }

        private void SendMessage(bool success)
        {
            string templeCode;
            Dictionary<string, string> dic_code;
            if (success)
            {

                dic_code = new()
                {
                    { "code", "success" }
                };
            }
            else
            {
                dic_code = new()
                {
                    { "code", "fail" }
                };
            }
            templeCode = _configuration.GetSection("AliYun").GetSection("Message").GetSection("TemplateCode_Login").Value;
            string telstr = _configuration.GetSection("AliYun").GetSection("AdministratorTel").Value;
            string[] tels = telstr.Split(',');
            string SignName = _configuration.GetSection("AliYun").GetSection("Message").GetSection("SignName").Value;
            foreach (var item in tels)
            {
                _message.Send(item, SignName, templeCode, dic_code);
            }
        }

    }

    public static class ExecuteAtFixedTimeMiddlewareExtensions
    {
        public static IApplicationBuilder UseExcuteAtTimeMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExecuteAtTimeMiddleware>();
        }
    }



}
