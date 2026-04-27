namespace MuhtarOtomasyon.API.DTOs.IslemDto
{
    public class IslemRaporDto
    {
        public string Islem { get; set; } = string.Empty;
        public int Adet { get; set; }
        public decimal ToplamHarc { get; set; }
    }
}
