namespace MuhtarOtomasyon.API.DTOs.IslemDto
{
    public class IslemListeDto
    {
        public int Id { get; set; }
        public string SakinAdSoyad { get; set; } = string.Empty;
        public string IslemAdi { get; set; } = string.Empty;
        public string Kategori { get; set; } = string.Empty;
        public decimal HarcTutari { get; set; }
        public DateTime IslemTarihi { get; set; }
        public string? EvrakKayitNo { get; set; }
    }
}
