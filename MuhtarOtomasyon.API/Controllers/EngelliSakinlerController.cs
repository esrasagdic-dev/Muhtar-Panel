using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MuhtarOtomasyon.API.Data;
using MuhtarOtomasyon.API.DTOs;
using MuhtarOtomasyon.API.Entities;

namespace MuhtarOtomasyon.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EngelliSakinlerController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EngelliSakinlerController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var liste = await _context.EngelliSakinler
                .OrderByDescending(x => x.EngelOrani) // Önce yüksek oranlıları görelim
                .ToListAsync();
            return Ok(liste);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EngelliSakinDto dto)
        {
            if (dto == null) return BadRequest();

            var yeniKayit = new EngelliSakin
            {
                AdSoyad = dto.AdSoyad,
                TCNo = dto.TCNo,
                EngelTuru = dto.EngelTuru,
                EngelOrani = dto.EngelOrani,
                KullandigiCihazlar = dto.KullandigiCihazlar,
                Adres = dto.Adres,
                Telefon = dto.Telefon,
                IhtiyacNotu = dto.IhtiyacNotu
            };

            _context.EngelliSakinler.Add(yeniKayit);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Kayıt başarıyla oluşturuldu." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var kayit = await _context.EngelliSakinler.FindAsync(id);
            if (kayit == null) return NotFound();

            _context.EngelliSakinler.Remove(kayit);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
