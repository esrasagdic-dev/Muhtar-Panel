using System.ComponentModel.DataAnnotations;

namespace MuhtarOtomasyon.API.DTOs
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Kullanıcı adı boş geçilemez.")]
        public string KullaniciAdi { get; set; } = string.Empty;

        [Required(ErrorMessage = "Şifre boş geçilemez.")]
        [DataType(DataType.Password)]
        public string Sifre { get; set; } = string.Empty;
    }
}
