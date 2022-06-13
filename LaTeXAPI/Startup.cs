

using System;
using System.IO;

using LaTeXAPI.Class;
using LaTeXAPI.Interface;
using LaTeXAPI.Models;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

using ToolsOfPanda;
using ToolsOfPanda.Interface;


namespace LaTeXAPI
{
    public class Startup
    {
        private IConfiguration _configuration { get; }
        private IWebHostEnvironment _env { get; }
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSwaggerGen(option =>
            {
                OpenApiInfo info = new()
                {
                    Title = "LaTeX¹«Ê½±à¼­Æ÷API",
                    Version = "1.6",
                    Description = "ÐÜÃ¨´óÏÀ"
                };
                option.SwaggerDoc("Beta", info);
                option.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, "LaTeXAPI.xml"));
            });
            services.AddSingleton<IHostedService, TimedExecutService>();
            services.AddDbContext<latexliveContext>(options =>
            {
                options.UseMySql(_configuration.GetConnectionString("ConnStr_MySQL"), ServerVersion.FromString("8.0.16-mysql"));
            });
            services.AddTransient<IDBTool>(x => new MySQLTool(_configuration.GetConnectionString("ConnStr_MySQL")));
            services.AddTransient<IRedisTool>(x => new RedisTool(_configuration.GetConnectionString("ConnStr_Redis")));
            services.AddTransient<ITokenTool>(x => new TokenTool(_configuration.GetSection("MyToken").GetSection("Secret").Value));
            services.AddTransient<IAliyunMessageCodeTool>(x => new AliyunMessageCodeTool(_configuration.GetSection("AliYun").GetSection("Message").GetSection("Region").Value, _configuration.GetSection("AliYun").GetSection("AccessKeyId").Value, _configuration.GetSection("AliYun").GetSection("AccessKeySecret").Value));
            services.AddTransient<IHttpTool, HttpTool>();
            services.AddTransient<IResult>(x => new Result(_env.ContentRootPath + "\\" + _configuration.GetSection("Path").GetSection("ErrLog").Value));
            services.AddTransient<ILogin, MyToken>();
            services.AddTransient<ILogin, Account>();
            services.AddTransient<ILogin, WX>();
            services.AddTransient<ILogin, MessageCode>();
            services.AddTransient<IClient, Account>();
            services.AddTransient<IMyToken, MyToken>();
            services.AddTransient<IMessageCode, MessageCode>();
            services.AddTransient<IPermission, RoleManage>();
            services.AddTransient<IMathPix, MathPix>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<IIPAddressRecord,IPAddressRecord>();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/Beta/swagger.json", "LaTeX¹«Ê½±à¼­Æ÷RestfulAPI"); });
            app.UseRouting();
            app.UseCors(options => options.WithOrigins("*").AllowAnyHeader().AllowAnyMethod());
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
