namespace MuhtarOtomasyon.API.DTOs.SakinDto
{
    public class SakinListeDto
    {
        public int Id { get; set; }
        public string TCNo { get; set; } = string.Empty;
        public string AdSoyad { get; set; } = string.Empty;
        public string Telefon { get; set; } = string.Empty;
        public string? HaneBilgisi { get; set; }
    }
}
