
using LaTeXAPI.Models;

namespace LaTeXAPI.Interface
{
    public interface IMathPix
    {
        /// <summary>
        /// 请求mathpix接口
        /// </summary>
        /// <param name="clientid">用户id</param>
        /// <param name="src">base64码流</param>
        /// <returns></returns>
        public string RequireMathPix(int clientid, string src);

        /// <summary>
        /// 获取用户当前剩余次数
        /// </summary>
        /// <param name="clientid"></param>
        /// <returns></returns>
        public ClientMathpix GetTime(int clientid);

        /// <summary>
        /// 获得用户默认次数
        /// </summary>
        /// <param name="clientid"></param>
        /// <returns></returns>
        public int[] GetDefaultTime(int clientid);

        /// <summary>
        /// 在午夜0点按照用户权限重置mathpix调用次数
        /// </summary>
        public void ReSetAllTime();
    }
}
