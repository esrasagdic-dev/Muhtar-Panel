using System.ComponentModel.DataAnnotations;

namespace MuhtarOtomasyon.API.Entities
{
    public class Muhtar
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string KullaniciAdi { get; set; } = string.Empty;

        [Required]
        public string Sifre { get; set; } = string.Empty;

        public string AdSoyad { get; set; } = string.Empty;
    }
}
