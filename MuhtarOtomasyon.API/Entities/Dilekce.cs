using System.ComponentModel.DataAnnotations;

namespace MuhtarOtomasyon.API.Entities
{
    public class Dilekce
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Baslik { get; set; } // Dilekçe Konusu

        [Required]
        public string GonderilenKurum { get; set; } // Hangi Makama?

        [Required]
        public string Icerik { get; set; } // Dilekçe Metni

        public DateTime KayitTarihi { get; set; } = DateTime.Now;

        // Babanın adı sabit kalsın ama veritabanında kimin yazdığı belli olsun
        public string OlusturanMuhtar { get; set; } = "İbrahim SAĞDIÇ";
    }
}
