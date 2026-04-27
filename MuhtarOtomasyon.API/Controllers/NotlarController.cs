using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MuhtarOtomasyon.API.Data;
using MuhtarOtomasyon.API.DTOs.NotDto;
using MuhtarOtomasyon.API.Entities;

namespace MuhtarOtomasyon.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotlarController : ControllerBase
    {
        private readonly AppDbContext _context;
        public NotlarController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetNotlar()
        {
            var notlar = await _context.Notlar
                .OrderByDescending(x => x.Tarih)
                .Select(n => new NotListeDto
                {
                    Id = n.Id,
                    Baslik = n.Baslik,
                    Icerik = n.Icerik,
                    Tarih = n.Tarih.ToString("dd.MM.yyyy HH:mm")
                })
                .ToListAsync();

            return Ok(notlar);
        }

        [HttpPost]
        public async Task<IActionResult> NotEkle(NotEkleDto model)
        {
            var yeniNot = new Not
            {
                Baslik = model.Baslik,
                Icerik = model.Icerik,
                Tarih = DateTime.Now // Tarihi biz atıyoruz
            };

            _context.Notlar.Add(yeniNot);
            await _context.SaveChangesAsync();

            return Ok(new { mesaj = "Not başarıyla kaydedildi!", id = yeniNot.Id });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> NotSil(int id)
        {
            var not = await _context.Notlar.FindAsync(id);
            if (not == null) return NotFound(new { mesaj = "Not bulunamadı." });

            _context.Notlar.Remove(not);
            await _context.SaveChangesAsync();
            return Ok(new { mesaj = "Not silindi." });
        }
    }
}
