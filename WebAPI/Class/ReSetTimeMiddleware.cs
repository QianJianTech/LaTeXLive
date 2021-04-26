using System;
using System.Threading;
using System.Threading.Tasks;

using LaTeXAPI.Interface;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace LaTeXAPI
{
    public class ExecuteAtTimeMiddleware
    {
        private readonly RequestDelegate _next;

        private IMathPix _mathPix { get; }

        public ExecuteAtTimeMiddleware(RequestDelegate next, IMathPix mathPix)
        {
            _next = next;
            _mathPix = mathPix;
        }
        public async Task Invoke(HttpContext httpContext)
        {
            DoAtTheTime();
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
            _mathPix.ReSetAllTime();
            DoAtTheTime();
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
