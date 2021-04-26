using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LaTeXAPI.Interface
{
    public interface IMessageCode
    {
        /// <summary>
        /// 发送验证码
        /// </summary>
        /// <param name="tel">接收验证码的手机号</param>
        /// <param name="templatecode">阿里云短信模板码</param>
        /// <returns></returns>
        public void SendVerifyCode(string tel, string templatecode);

        /// <summary>
        /// 一分钟禁止发送剩余秒数
        /// </summary>
        /// <param name="tel"></param>
        /// <returns></returns>
        public int GetRemainTime(string tel);

        /// <summary>
        /// 验证身份
        /// </summary>
        /// <param name="id"></param>
        /// <param name="tel"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        public string Identity(int id, string code, string tel = "");

        /// <summary>
        /// 清除缓存中的验证码
        /// </summary>
        /// <param name="tel"></param>
        public void ClearVerifyCode(string tel);
    }
}
