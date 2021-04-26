using System;
using System.Collections.Generic;

#nullable disable

namespace LaTeXAPI.Models
{
    public partial class Client
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Tel { get; set; }
        public string Mail { get; set; }
        public string Wechat { get; set; }
        public string Qq { get; set; }
        public string Weibo { get; set; }
        public string Portrait { get; set; }
        public string Nickname { get; set; }
        public string Regfrom { get; set; }
        public string Status { get; set; }
    }
}
