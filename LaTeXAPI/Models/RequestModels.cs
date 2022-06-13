

namespace LaTeXAPI.Models
{


    public class MyTokenRequest
    {
        public string mytoken { get; set; }
    }

    public class AccountLoginRequest
    {
        public string loginname { get; set; }
        public string password { get; set; }
    }

    public class AccountRegRequest
    {
        public string username { get; set; }
        public string password { get; set; }
        public string tel { get; set; }
        public string mail { get; set; }

        public string equiptype { get; set; }
    }

    public class ClientUpdateRequest
    {
        public string mytoken { get; set; }
        public string code { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Tel { get; set; }
        public string Mail { get; set; }
        public string Wechat { get; set; }
        public string Qq { get; set; }
        public string Weibo { get; set; }
        public string Portrait { get; set; }
        public string Nickname { get; set; }
    }

    public class ClientRemoveRequest
    {
        public string mytoken { get; set; }

        public string code { get; set; }
    }

    public class WXCodeLoginRequest
    {
        public string code { get; set; }

        public string equiptype { get; set; }
    }

    public class WXBindRequest
    {
        public string mytoken { get; set; }
        public string code { get; set; }
    }

    public class MessageCodeLoginRequest
    {
        public string tel { get; set; }
        public string code { get; set; }

        public string equiptype { get; set; }
    }

    public class MessageCodeIdentityRequest
    {
        public string mytoken { get; set; }
        public string code { get; set; }
    }

    public class SendIdentityMessageCodeRequest
    {
        public string mytoken { get; set; }
    }

    public class SendLoginMessageCodeRequest
    {
        public string tel { get; set; }
    }

    public class GetMessageCodeRemainTimeRequest
    {
        public string tel { get; set; }
    }

    public class GetLaTexFromMathPixRequest
    {
        public string mytoken { get; set; }

        public string src { get; set; }
    }

}
