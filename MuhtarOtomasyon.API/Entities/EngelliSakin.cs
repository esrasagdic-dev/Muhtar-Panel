using System.ComponentModel.DataAnnotations;

namespace MuhtarOtomasyon.API.Entities
{
    public class EngelliSakin
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string AdSoyad { get; set; }

        public string TCNo { get; set; }

        public string EngelTuru { get; set; } // Örn: Ortopedik, Görme, Zihinsel vb.

        public int EngelOrani { get; set; } // % olarak (Örn: 40, 70)

        public string KullandigiCihazlar { get; set; } // Tekerlekli sandalye, işitme cihazı vb.

        public string Adres { get; set; }

        public string Telefon { get; set; }

        public string IhtiyacNotu { get; set; } // "Rampa ihtiyacı var", "Düzenli ilaç yardımı" gibi.

        public DateTime KayitTarihi { get; set; } = DateTime.Now;
    }
}
