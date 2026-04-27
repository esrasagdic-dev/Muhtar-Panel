using System.ComponentModel.DataAnnotations;

namespace MuhtarOtomasyon.API.DTOs
{
    public class SokakEkleDto
    {
        [Required(ErrorMessage = "Sokak adı girmek zorunludur.")]
        public string Ad { get; set; } = string.Empty;
    }
}
