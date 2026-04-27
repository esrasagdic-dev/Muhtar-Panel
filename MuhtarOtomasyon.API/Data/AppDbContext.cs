using Microsoft.EntityFrameworkCore;
using MuhtarOtomasyon.API.Entities;

namespace MuhtarOtomasyon.API.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Sokak> Sokaklar { get; set; }
        public DbSet<Istatistik> Istatistikler { get; set; }
        public DbSet<Sakin> Sakinler { get; set; } = null!;
        public DbSet<MuhtarlikIslem> MuhtarlikIslemleri { get; set; }
        public DbSet<Muhtar> Muhtarlar { get; set; }
        public DbSet<Duyuru> Duyurular { get; set; } = null!;
        public DbSet<Not> Notlar { get; set; }
        public DbSet<IhtiyacSahibi> IhtiyacSahipleri { get; set; }
        public DbSet<KamuKurulusu> KamuKuruluslari { get; set; }
        public DbSet<EngelliSakin> EngelliSakinler { get; set; }
        public DbSet<Dilekce> Dilekceler { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // TC No benzersiz olmalı, baban yanlışlıkla aynı kişiyi iki kez girmesin
            modelBuilder.Entity<Sakin>()
                .HasIndex(s => s.TCNo)
                .IsUnique();

            // Opsiyonel: Muhtarın kullanıcı adını da benzersiz yapalım
            modelBuilder.Entity<Muhtar>()
                .HasIndex(m => m.KullaniciAdi)
                .IsUnique();
        }
    }
}
