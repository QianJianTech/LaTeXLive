using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using LaTeXAPI.Models;

namespace LaTeXAPI.Interface
{
    public interface ILogin
    {
        public Client Login(string loginname, string password = "");
    }
}
