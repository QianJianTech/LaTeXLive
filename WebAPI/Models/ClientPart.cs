
using ToolsOfPanda;
namespace LaTeXAPI.Models
{
    public partial class Client
    {
        public Client()
        {
            Id = 0;
            Username = string.Empty;
            Password = string.Empty;
            Tel = string.Empty;
            Mail = string.Empty;
            Wechat = string.Empty;
            Qq = string.Empty;
            Weibo = string.Empty;
            Portrait = string.Empty;
            Nickname = string.Empty;
            Regfrom = string.Empty;
            Status = ClientStatus.unregistered.ToString();
        }
        public enum ClientStatus
        {
            unregistered,
            normal,
            cancelled,
            blacklist
        }

        public enum RegFrom
        {
            account,
            tel,
            wx,
            qq,
            weibo
        }
        private const string _hidePassword = "********";
        private const string _defaultPassword = "123456zZ";

        public enum Special
        {
            ForceEmpty
        }

        public Client SetId(int id)
        {
            Id = id;
            return this;
        }

        public Client HidePassword()
        {
            Password = _hidePassword;
            return this;
        }

        public Client SetStatusNormal()
        {
            Status = ClientStatus.normal.ToString();
            return this;
        }

        public Client SetDefaultUsnameAndPsword()
        {
            Username = Common.GetNowTimeStamp().ToString() + Common.GetRandomCode(3).ToString();
            Password = _defaultPassword;
            return this;
        }
    }
}
