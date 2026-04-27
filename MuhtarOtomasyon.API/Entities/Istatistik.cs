namespace MuhtarOtomasyon.API.Entities
{
    public class Istatistik
    {
        public int Id { get; set; }
        public int ToplamNufus { get; set; }
        public int KonutSayisi { get; set; }
        public double NufusYogunlugu { get; set; } // Double olmalı
        public decimal OrtalamaHaneGeliri { get; set; } // Decimal olmalı
        public DateTime SonGuncelleme { get; set; } = DateTime.Now;
    }
}
