using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using MuhtarOtomasyon.API.Data;

namespace MuhtarOtomasyon.API.Entities
{
    public class MuhtarlikIslem
    {
        [Key]
        public int Id { get; set; }

        // --- Kişi Bağlantısı ---
        [Required(ErrorMessage = "İşlemin yapılacağı kişi seçilmelidir.")]
        public int SakinId { get; set; }

        [ForeignKey("SakinId")]
        [JsonIgnore] // JSON döngüsünü engeller
        public virtual Sakin? Sakin { get; set; }

        // --- İşlem Bilgileri ---
        [Required]
        [StringLength(50)]
        public string Kategori { get; set; } = string.Empty; // Örn: Evrak, Yardım, Tebligat

        [Required]
        [StringLength(100)]
        public string IslemAdi { get; set; } = string.Empty; // Örn: İkametgah Belgesi

        public string? Aciklama { get; set; } // Babanın ekleyeceği notlar

        // --- Evrak ve Mali Bilgiler ---
        public string? EvrakKayitNo { get; set; } // Defterdeki kayıt numarası

        [Column(TypeName = "decimal(18,2)")]
        public decimal HarcTutari { get; set; } = 0; // Alınan ücret

        public DateTime IslemTarihi { get; set; } = DateTime.Now;

        public string? BelgeFotoYolu { get; set; } // İleride fotoğraf eklemek istersen
    }
}


