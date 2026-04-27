namespace MuhtarOtomasyon.API.DTOs.NotDto
{
    public class NotListeDto
    {
        public int Id { get; set; }
        public string Baslik { get; set; } = string.Empty;
        public string Icerik { get; set; } = string.Empty;
        public string Tarih { get; set; } = string.Empty;
    }
}
