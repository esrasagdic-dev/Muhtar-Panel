namespace MuhtarOtomasyon.API.DTOs.IslemDto
{
    public class IslemEkleDto
    {
        public int SakinId { get; set; }
        public string IslemAdi { get; set; } = string.Empty;
        public string Kategori { get; set; } = string.Empty;
        public decimal HarcTutari { get; set; }
        public string? Aciklama { get; set; }
        public string? EvrakKayitNo { get; set; }
    }
}
