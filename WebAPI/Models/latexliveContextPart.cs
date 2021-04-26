using System;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;


namespace LaTeXAPI.Models
{
    public partial class latexliveContext : DbContext
    {
        private string ConnectString { get; set; }

        public latexliveContext(string connstr)
        {
            ConnectString = connstr;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql(ConnectString, ServerVersion.FromString("8.0.16-mysql"));
            }
        }
    }
}
