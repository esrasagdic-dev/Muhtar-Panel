using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MuhtarOtomasyon.API.Data;
using MuhtarOtomasyon.API.DTOs.DuyuruDto;
using MuhtarOtomasyon.API.Entities;

namespace MuhtarOtomasyon.API.Controllers
{
    [Route("api/Duyurular")]
    [ApiController]
    public class DuyuruController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DuyuruController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DuyuruListeDto>>> GetDuyurular()
        {
            return await _context.Duyurular
                .OrderByDescending(d => d.OncelikliMi)
                .ThenByDescending(d => d.YayinTarihi)
                .Select(d => new DuyuruListeDto // Entity -> DTO dönüşümü
                {
                    Id = d.Id,
                    Baslik = d.Baslik,
                    Icerik = d.Icerik,
                    YayinTarihi = d.YayinTarihi,
                    OncelikliMi = d.OncelikliMi
                })
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult> PostDuyuru(DuyuruEkleDto model)
        {
            var yeniDuyuru = new Duyuru
            {
                Baslik = model.Baslik,
                Icerik = model.Icerik,
                OncelikliMi = model.OncelikliMi,
                YayinTarihi = DateTime.Now // Tarihi burada biz atıyoruz, kullanıcı değil!
            };

            _context.Duyurular.Add(yeniDuyuru);
            await _context.SaveChangesAsync();

            return Ok(new { mesaj = "Duyuru başarıyla eklendi!" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDuyuru(int id)
        {
            var duyuru = await _context.Duyurular.FindAsync(id);
            if (duyuru == null) return NotFound(new { mesaj = "Duyuru bulunamadı." });

            _context.Duyurular.Remove(duyuru);
            await _context.SaveChangesAsync();
            return Ok(new { mesaj = "Duyuru silindi." });
        }
    }
}
