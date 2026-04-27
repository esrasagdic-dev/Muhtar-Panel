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
    public class KamuKurulusuController : ControllerBase
    {
        private readonly AppDbContext _context;

        public KamuKurulusuController(AppDbContext context)
        {
            _context = context;
        }

        // LİSTELE
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var liste = await _context.KamuKuruluslari
                .OrderBy(x => x.KurumAdi)
                .ToListAsync();
            return Ok(liste);
        }

        // EKLE
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] KamuKurulusuDto dto)
        {
            if (dto == null) return BadRequest("Veri boş geldi.");

            var yeniKurum = new KamuKurulusu
            {
                KurumAdi = dto.KurumAdi,
                KurumTuru = dto.KurumTuru,
                YetkiliKisi = dto.YetkiliKisi,
                Telefon = dto.Telefon,
                Adres = dto.Adres
            };

            _context.KamuKuruluslari.Add(yeniKurum);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Eskişehir Kamu Kuruluşu Kaydedildi." });
        }

        // SİL
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var kurum = await _context.KamuKuruluslari.FindAsync(id);
            if (kurum == null) return NotFound();

            _context.KamuKuruluslari.Remove(kurum);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
