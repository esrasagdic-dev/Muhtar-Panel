namespace MuhtarOtomasyon.API.DTOs
{
    public class BelgeArsivDto
    {
        public string BelgeAdi { get; set; }
        public string BelgeYolu { get; set; } // Fotoğrafın sunucudaki konumu
        public string SakinAdSoyad { get; set; } // Hangi sakine ait olduğu
    }
}
