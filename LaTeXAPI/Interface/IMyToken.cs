namespace LaTeXAPI.Interface
{
    public interface IMyToken
    {

        /// <summary>
        /// 验证MyToken的合法性
        /// </summary>
        /// <param name="mytoken">传递的Token</param>
        /// <returns>用户Id</returns>
        public int ValidateMyToken(string mytoken);

        /// <summary>
        /// 根据ID获取新的MyToken
        /// </summary>
        /// <param name="id">用户Id</param>
        /// <returns>一个新的Token</returns>
        public string GetNewMyToken(int id);

    }
}
