using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace LaTeXAPI.Models
{
    public partial class latexliveContext : DbContext
    {
        public latexliveContext()
        {
        }

        public latexliveContext(DbContextOptions<latexliveContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<ClientMathpix> ClientMathpixes { get; set; }
        public virtual DbSet<ClientRole> ClientRoles { get; set; }
        public virtual DbSet<IpClient> IpClients { get; set; }
        public virtual DbSet<Mathpixtime> Mathpixtimes { get; set; }
        public virtual DbSet<Permission> Permissions { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<RolePermission> RolePermissions { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>(entity =>
            {
                entity.ToTable("client");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id")
                    .HasComment("用户编号，最大数目几亿");

                entity.Property(e => e.Mail)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("mail")
                    .HasDefaultValueSql("''")
                    .HasComment("电子邮件，最长40个字符；邮件格式的后端校验")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Nickname)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("nickname")
                    .HasDefaultValueSql("''")
                    .HasComment("用户昵称")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("password")
                    .HasDefaultValueSql("''")
                    .HasComment("后端校验非法字符")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Portrait)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("portrait")
                    .HasDefaultValueSql("''")
                    .HasComment("头像图片路径")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Qq)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("qq")
                    .HasDefaultValueSql("''")
                    .HasComment("qq号")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Regfrom)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("regfrom")
                    .HasDefaultValueSql("''")
                    .HasComment("用户注册来源（账号注册、手机短信、微信、QQ、微博）")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("status")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Tel)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("tel")
                    .HasDefaultValueSql("''")
                    .HasComment("手机号，手机格式的后端校验")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("username")
                    .HasDefaultValueSql("''")
                    .HasComment("用户名，最长40个字符的后端校验")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Wechat)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("wechat")
                    .HasDefaultValueSql("''")
                    .HasComment("微信")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Weibo)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("weibo")
                    .HasDefaultValueSql("''")
                    .HasComment("新浪微博")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");
            });

            modelBuilder.Entity<ClientMathpix>(entity =>
            {
                entity.ToTable("client_mathpix");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.ClientId)
                    .HasColumnType("int(11)")
                    .HasColumnName("client_id");

                entity.Property(e => e.PrivateTimes)
                    .HasColumnType("int(11)")
                    .HasColumnName("private_times");

                entity.Property(e => e.Times)
                    .HasColumnType("int(11)")
                    .HasColumnName("times");
            });

            modelBuilder.Entity<ClientRole>(entity =>
            {
                entity.ToTable("client_role");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.ClientId)
                    .HasColumnType("int(11)")
                    .HasColumnName("client_id");

                entity.Property(e => e.RoleId)
                    .HasColumnType("int(11)")
                    .HasColumnName("role_id");
            });

            modelBuilder.Entity<IpClient>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("ip_client");

                entity.Property(e => e.ClientId)
                    .HasColumnType("int(11)")
                    .HasColumnName("client_id");

                entity.Property(e => e.ClientRegfrom)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("client_regfrom")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Equiptype)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("equiptype")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.IdIpClient)
                    .HasColumnType("int(255)")
                    .HasColumnName("id_ip_client");

                entity.Property(e => e.Ip)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("ip")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Regdate)
                    .HasColumnType("datetime")
                    .HasColumnName("regdate");
            });

            modelBuilder.Entity<Mathpixtime>(entity =>
            {
                entity.ToTable("mathpixtimes");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Date)
                    .IsRequired()
                    .HasColumnType("varchar(20)")
                    .HasColumnName("date")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Times)
                    .HasColumnType("int(6)")
                    .HasColumnName("times");
            });

            modelBuilder.Entity<Permission>(entity =>
            {
                entity.ToTable("permission");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Descript)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("descript")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("name")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("value")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("role");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Descript)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("descript")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .HasColumnName("name")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");
            });

            modelBuilder.Entity<RolePermission>(entity =>
            {
                entity.ToTable("role_permission");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.PermissionId)
                    .HasColumnType("int(11)")
                    .HasColumnName("permission_id");

                entity.Property(e => e.RoleId)
                    .HasColumnType("int(11)")
                    .HasColumnName("role_id");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
