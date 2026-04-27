namespace MuhtarOtomasyon.API.DTOs.IstatistikDto
{
    public class IstatistikOzetDto
    {
        public int GenelNufus { get; set; }
        public int GenelKonutSayisi { get; set; }
        public double GenelYogunluk { get; set; } // Burası double!
        public decimal GenelHaneGeliri { get; set; } // Burası decimal!

        public int KayitliSakinSayisi { get; set; }
        public int EngelliSakinSayisi { get; set; }
        public int IhtiyacSahibiSayisi { get; set; }

        public List<object> EnKalabalikSokaklar { get; set; }
        public string SonGuncellemeTarihi { get; set; }
    }
}
