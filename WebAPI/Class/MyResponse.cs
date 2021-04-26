namespace LaTeXAPI.Class
{
    public static class MyResponse
    {
        public enum Key
        {
            userinfo,
            token,
            errinfo,
            info,
            remaintime,
            mathpixtime
        }


    }

    public static class MyInfo
    {
        public static string RemoveSuccess(string id)
        {
            return "已删除Id为[" + id + "]的用户";
        }

        public static string SendVerifyCodeSucess(string tel)
        {
            return "已向手机号:[" + tel + "]发送验证码";
        }
    }
}
