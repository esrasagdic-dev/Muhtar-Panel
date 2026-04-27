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
    public class SokaklarController : ControllerBase
    {
        private readonly AppDbContext _context;
        public SokaklarController(AppDbContext context) => _context = context;

        // Tüm sokakları alfabetik sırayla getirir
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var sokaklar = await _context.Sokaklar.OrderBy(s => s.Ad).ToListAsync();
            return Ok(sokaklar);
        }

        // Yeni sokak ekleme
        [HttpPost]
        public async Task<IActionResult> Create(SokakEkleDto model)
        {
            var yeniSokak = new Sokak { Ad = model.Ad };
            _context.Sokaklar.Add(yeniSokak);
            await _context.SaveChangesAsync();
            return Ok(new { mesaj = "Sokak listeye eklendi!", id = yeniSokak.SokakId });
        }

        // Sokak silme
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var sokak = await _context.Sokaklar.FindAsync(id);
            if (sokak == null) return NotFound();

            _context.Sokaklar.Remove(sokak);
            await _context.SaveChangesAsync();
            return Ok(new { mesaj = "Sokak listeden kaldırıldı." });
        }
    }
}
