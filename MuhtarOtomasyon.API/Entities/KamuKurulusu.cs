using System.ComponentModel.DataAnnotations;

namespace MuhtarOtomasyon.API.Entities
{
    public class KamuKurulusu
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string KurumAdi { get; set; }

        public string KurumTuru { get; set; } // Okul, Sağlık Ocağı vb.

        public string YetkiliKisi { get; set; } 

        public string Telefon { get; set; }

        public string Adres { get; set; }

        public DateTime KayitTarihi { get; set; } = DateTime.Now;
    }
}
