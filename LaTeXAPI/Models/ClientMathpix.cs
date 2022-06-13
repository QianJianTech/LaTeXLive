using System;
using System.Collections.Generic;

#nullable disable

namespace LaTeXAPI.Models
{
    public partial class ClientMathpix
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public int Times { get; set; }
        public int PrivateTimes { get; set; }
    }
}
