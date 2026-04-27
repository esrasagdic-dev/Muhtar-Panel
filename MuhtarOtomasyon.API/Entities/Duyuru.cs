using System.ComponentModel.DataAnnotations;

namespace MuhtarOtomasyon.API.Entities
{
    public class Duyuru
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Baslik { get; set; } = string.Empty;

        [Required]
        public string Icerik { get; set; } = string.Empty;

        public DateTime YayinTarihi { get; set; } = DateTime.Now;

        // Önemli duyurular ana sayfada en üstte ve renkli görünsün diye:
        public bool OncelikliMi { get; set; } = false;
    }

}