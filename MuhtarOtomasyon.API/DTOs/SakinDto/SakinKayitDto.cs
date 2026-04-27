namespace MuhtarOtomasyon.API.DTOs.SakinDto
{
    public class SakinKayitDto
    {
        public string TCNo { get; set; } = string.Empty;
        public string Ad { get; set; } = string.Empty;
        public string Soyad { get; set; } = string.Empty;
        public string Telefon { get; set; } = string.Empty;
        public int HaneId { get; set; }
        public bool EngelDurumu { get; set; }
        public string? KanGrubu { get; set; }
    }

    }
