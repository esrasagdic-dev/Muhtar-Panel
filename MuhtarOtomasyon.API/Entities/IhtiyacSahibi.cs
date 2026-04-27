namespace MuhtarOtomasyon.API.Entities
{
    public class IhtiyacSahibi
    {
        public int Id { get; set; }
        public string AdSoyad { get; set; }
        public string TCNo { get; set; }
        public string Telefon { get; set; }
        public string Adres { get; set; }
        public decimal Gelir { get; set; }
        public string EvDurumu { get; set; } // "Kira" veya "Ev Sahibi"
        public string ArabaVarMi { get; set; } // "Evet" veya "Hayır"
        public DateTime KayitTarihi { get; set; } = DateTime.Now;
    }
}
