namespace LaTeXAPI.Class
{
    public static class MyException
    {
        public static string GetWXTokenWrong(string tokeninfo)
        {
            return "请求微信API获取wxtoken失败，返回信息为[" + tokeninfo + "]";
        }
        public static string GetWXUserinfoWrong(string wxinfo)
        {
            return "请求微信API获取wxuserinfo失败，返回信息为[" + wxinfo + "]";
        }
        public static string MailAlreadExist()
        {
            return "邮箱已存在";
        }
        public static string MailFormatWrong(string mail)
        {
            return "邮箱[" + mail + "]格式错误";
        }
        public static string MathPixRunOutOf(string clientid)
        {
            //return "用户[" + clientid + "]今日Mathpix接口调用次数已尽";
            return "今日Mathpix接口调用次数已尽，请在[个人中心]中查看";
        }
        public static string PasswordEmpty()
        {
            return "密码不可为空";
        }
        public static string PasswordWrong()
        {
            return "密码错误";
        }
        public static string PermissionIsNotFound()
        {
            return "用户权限列表没有找到";
        }
        public static string RecordRepeat(string recored)
        {
            return "重复记录:" + recored;
        }
        public static string SendVerifyCodeFrequence(string second)
        {
            return "发送验证码过于频繁，请[" + second + "]秒后尝试";
        }
        public static string TelAlreadyExist()
        {
            return "手机号已存在";
        }
        public static string TelFormatWrong(string tel)
        {
            return "手机号[" + tel + "]格式错误";
        }
        public static string TelNumberCanNotBeUsername()
        {
            return "手机号不可作为用户名";
        }
        public static string TokenContentIllegal(string content)
        {
            return "token负载[" + content + "]非法，疑似遭受攻击: ";
        }
        public static string TokenEmpty()
        {
            return "Token不可为空";
        }
        public static string TokenExpired()
        {
            return "token已过期或不存在";
        }
        public static string UserIsNotExist()
        {
            return "用户不存在";
        }
        public static string UsernameAlreadyExist()
        {
            return "用户名已存在";
        }
        public static string UsernameEmpty()
        {
            return "用户名不可为空";
        }
        public static string UsernameFormatWrong(string username)
        {
            return "用户名[" + username + "]只能由4-16位大小写字母、数字、下划线组成";
        }
        public static string UserStatusWrong(string client)
        {
            return "用户[" + client + "]的状态异常";
        }
        public static string VerifyCodeExpired()
        {
            return "验证码已过期或不存在";
        }
        public static string VerifyCodeTypeIsNotExist(string type)
        {
            return "短信验证码类型[" + type + "]不能被识别";
        }
        public static string VerifyCodeWrong(string code)
        {
            return "验证码[" + code + "]错误";
        }
        public static string HaveNotBindTel()
        {
            return "此操作需要先绑定手机号才能进行";
        }
        public static string WeChatAlreadyExist()
        {
            return "微信号已经注册或绑定在其他账号";
        }
        public static string QQAlreadyExist()
        {
            return "QQ号已经注册或绑定在其他账号";
        }
        public static string WeiBoAlreadyExist()
        {
            return "微博号已经注册或绑定在其他账号";
        }
        public static string LoginNameEmpty()
        {
            return "登录名不可为空";
        }
    }

}
