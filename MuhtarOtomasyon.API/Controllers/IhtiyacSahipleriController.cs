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
    public class IhtiyacSahipleriController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IhtiyacSahipleriController(AppDbContext context)
        {
            _context = context;
        }

        // TÜM LİSTEYİ GETİR
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            var liste = await _context.IhtiyacSahipleri
                .OrderByDescending(x => x.KayitTarihi)
                .ToListAsync();
            return Ok(liste);
        }

        // YENİ KAYIT EKLE
        [HttpPost]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] IhtiyacSahibi model)
        {
            if (model == null) return BadRequest("Veri boş geldi.");

            // Manuel tarih ataması (Eğer modelde default değilse)
            model.KayitTarihi = DateTime.Now;

            _context.IhtiyacSahipleri.Add(model);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Eskişehir Sosyal Yardım Kaydı Başarıyla Oluşturuldu." });
        }

        // KAYIT SİL (Lazım olur diye ekledim)
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var kisi = await _context.IhtiyacSahipleri.FindAsync(id);
            if (kisi == null) return NotFound();

            _context.IhtiyacSahipleri.Remove(kisi);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
