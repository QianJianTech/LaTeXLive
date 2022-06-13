using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

using LaTeXAPI.Interface;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

using ToolsOfPanda.Interface;

namespace LaTeXAPI.Class
{
    public class TimedExecutService : BackgroundService
    {
        private IHostEnvironment _env { get; }
        private IConfiguration _configuration { get; }

        private IMathPix _mathPix { get; }

        private IAliyunMessageCodeTool _message { get; }

        private DateTime _theTime;

        private int _tik = 60000;
        public TimedExecutService(IHostEnvironment env, IConfiguration configuration, IMathPix mathPix, IAliyunMessageCodeTool message)
        {
            _env = env;
            _configuration = configuration;
            _mathPix = mathPix;
            _message = message;
            SetTheTime();
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                DoAtTheTime();
                await Task.Delay(_tik, stoppingToken);
            }
        }

        private void SetTheTime()
        {
            if (_configuration != null)
            {
                _tik = Convert.ToInt32(_configuration.GetSection("Mathpix").GetSection("Tik").Value);
                string timeString = _configuration.GetSection("Mathpix").GetSection("TheTime").Value;
                string[] timeStringArray = timeString.Split(':');
                int[] timeIntArray = new int[3];
                for (int i = 0; i < 3; i++)
                {
                    timeIntArray[i] = Convert.ToInt32(timeStringArray[i]);
                }
                double addseconds = timeIntArray[0] * 3600 + timeIntArray[1] * 60 + timeIntArray[2];
                _theTime = DateTime.Today.AddSeconds(addseconds);
            }
        }

        /// <summary>
        /// 凌晨0时执行重置
        /// </summary>
        private void DoAtTheTime()
        {
            DateTime now = DateTime.Now;
            if (now > _theTime)
            {
                _theTime = _theTime.AddDays(1.0);
                ResetAllMathPixTime();                
                Write(now.ToString("yyyy-MM-dd HH:mm:sss") +  _theTime.ToString("yyyy-MM-dd HH:mm:sss"));

            }
            else
            {
                Write( now.ToString("yyyy-MM-dd HH:mm:sss") +  _theTime.ToString("yyyy-MM-dd HH:mm:sss"));
            }
        }

        private void Write(string str)
        {
            System.IO.StreamWriter writer;
            string path = _env.ContentRootPath + "\\" + "ExaminPerHour.log";
            if (System.IO.File.Exists(path))
            {
                writer = new System.IO.StreamWriter(path, true, System.Text.Encoding.GetEncoding("UTF-8"));
            }
            else
            {
                writer = new System.IO.StreamWriter(path, false, System.Text.Encoding.GetEncoding("UTF-8"));
            }
            writer.WriteLine(str);
            writer.Close();
        }

        /// <summary>
        /// 重置
        /// </summary>
        private void ResetAllMathPixTime()
        {
            try
            {
                _mathPix.ReSetAllTime();
                //SendMessage(true);
            }
            catch (Exception)
            {
                SendMessage(false);
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
            string SignName = _configuration.GetSection("AliYun").GetSection("Message").GetSection("SignName").Value;
            string telstr = _configuration.GetSection("AliYun").GetSection("AdministratorTel").Value;
            string[] tels = telstr.Split(',');
            foreach (var item in tels)
            {
                _message.Send(item, SignName, templeCode, dic_code);
            }
        }

    }
}
