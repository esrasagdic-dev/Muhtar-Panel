using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MuhtarOtomasyon.API.Data;
using MuhtarOtomasyon.API.DTOs;
using MuhtarOtomasyon.API.Entities; // <-- Buranın olduğundan emin ol

namespace MuhtarOtomasyon.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model) // LoginRequest yerine LoginDto kullandık
        {
            var muhtar = await _context.Muhtarlar
                .FirstOrDefaultAsync(m => m.KullaniciAdi == model.KullaniciAdi && m.Sifre == model.Sifre);

            if (muhtar == null)
            {
                return Unauthorized(new { basarili = false, mesaj = "Kullanıcı adı veya şifre hatalı!" });
            }

            // Burada React'a döneceğimiz veriyi de bir nesne olarak hazırlıyoruz
            return Ok(new
            {
                basarili = true,
                mesaj = $"Hoş geldin {muhtar.AdSoyad}!",
                muhtarId = muhtar.Id,
                adSoyad = muhtar.AdSoyad
                // İleride buraya 'token' bilgisini de ekleyeceksin
            });
        }

    }
}

