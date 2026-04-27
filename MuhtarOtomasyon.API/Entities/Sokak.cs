using System.ComponentModel.DataAnnotations;

namespace MuhtarOtomasyon.API.Entities
{
    public class Sokak
    {
        [Key]
        public int SokakId { get; set; }

        [Required(ErrorMessage = "Sokak adı boş bırakılamaz.")]
        [StringLength(150)]
        public string Ad { get; set; } = string.Empty;

        // İleride bu sokaktaki olayları takip etmek istersen diye:
        public DateTime KayitTarihi { get; set; } = DateTime.Now;
    }
}

