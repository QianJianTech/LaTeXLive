using System;
using System.Collections.Generic;

#nullable disable

namespace LaTeXAPI.Models
{
    public partial class Permission
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public string Descript { get; set; }
    }
}
