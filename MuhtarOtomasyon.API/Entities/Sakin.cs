using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MuhtarOtomasyon.API.Entities
{
    public class Sakin
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(11, MinimumLength = 11)]
        public string TCNo { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Ad { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Soyad { get; set; } = string.Empty;

        public string? Telefon { get; set; }

        [Column(TypeName = "date")]
        public DateTime? DogumTarihi { get; set; }

        public string? KanGrubu { get; set; }
        public bool EngelDurumu { get; set; } = false;
        public string? Notlar { get; set; }

        // Bu kişi hangi evde yaşıyor? (Hane ile bağlama)
        public int SokakId { get; set; }
        [ForeignKey("SokakId")]
        public virtual Sokak? Sokak { get; set; } 
    }
}
