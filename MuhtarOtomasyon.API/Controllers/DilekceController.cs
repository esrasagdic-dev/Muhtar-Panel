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
    public class DilekceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DilekceController(AppDbContext context)
        {
            _context = context;
        }

        // Geçmiş Dilekçeleri Listele
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var liste = await _context.Dilekceler
                .OrderByDescending(x => x.KayitTarihi)
                .ToListAsync();
            return Ok(liste);
        }

        // Yeni Dilekçe Kaydet
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DilekceDto dto)
        {
            if (dto == null) return BadRequest();

            var yeniDilekce = new Dilekce
            {
                Baslik = dto.Baslik,
                GonderilenKurum = dto.GonderilenKurum,
                Icerik = dto.Icerik
            };

            _context.Dilekceler.Add(yeniDilekce);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Dilekçe başarıyla sisteme kaydedildi." });
        }

        // Silme İşlemi
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var veri = await _context.Dilekceler.FindAsync(id);
            if (veri == null) return NotFound();

            _context.Dilekceler.Remove(veri);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
