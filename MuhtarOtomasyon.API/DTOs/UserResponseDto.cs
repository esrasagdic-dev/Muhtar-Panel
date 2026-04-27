namespace MuhtarOtomasyon.API.DTOs
{
    public class UserResponseDto
    {
        public string AdSoyad { get; set; }
        public string Rol { get; set; } // Muhtar mı, Azza mı?
        public string Token { get; set; } // JWT kullanacaksan
    }
}
