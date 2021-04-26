
using LaTeXAPI.Models;

namespace LaTeXAPI.Interface
{
    public interface IClient
    {
        public Client Add(Client client);

        public Client Update(Client client);

        public void Remove(int id);
    }
}
