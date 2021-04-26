using System;
using System.Collections.Generic;

#nullable disable

namespace LaTeXAPI.Models
{
    public partial class IpClient
    {
        public int IdIpClient { get; set; }
        public DateTime Regdate { get; set; }
        public string Ip { get; set; }
        public int ClientId { get; set; }
        public string ClientRegfrom { get; set; }
        public string Equiptype { get; set; }
    }
}
