using System;
using System.Collections.Generic;

#nullable disable

namespace LaTeXAPI.Models
{
    public partial class ClientRole
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public int RoleId { get; set; }
    }
}
