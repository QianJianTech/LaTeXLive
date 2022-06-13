using Microsoft.AspNetCore.Http;
using LaTeXAPI.Models;
using ToolsOfPanda.Interface;
namespace LaTeXAPI.Interface
{
    public interface IIPAddressRecord
    {

        public void RecordIPAddress(IHttpContextAccessor contextAccessor, string id, string regfrom, string equipType);
    }
}
