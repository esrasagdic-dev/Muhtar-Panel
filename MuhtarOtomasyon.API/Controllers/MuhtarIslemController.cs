using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MuhtarOtomasyon.API.Data;
using MuhtarOtomasyon.API.DTOs.IslemDto;
using MuhtarOtomasyon.API.Entities;

namespace MuhtarOtomasyon.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MuhtarIslemController : ControllerBase
    {
        private readonly AppDbContext _context;
        public MuhtarIslemController(AppDbContext context) => _context = context;

        // 1. HAZIR İŞLEM LİSTESİ
        [HttpGet("hazir-liste")]
        public IActionResult GetHazirListe()
        {
            var liste = new[] {
                new { Kategori = "Evrak", Ad = "İkametgah Belgesi", VarsayilanHarc = 20.00 },
                new { Kategori = "Evrak", Ad = "Fakirlik Belgesi", VarsayilanHarc = 0.00 },
                new { Kategori = "Yardım", Ad = "Kömür Yardımı", VarsayilanHarc = 0.00 },
                new { Kategori = "Tebligat", Ad = "Mahkeme Tebligatı", VarsayilanHarc = 0.00 }
            };
            return Ok(liste);
        }

        // --- KRİTİK DÜZELTME: Route eklendi ---
        // React tarafından çağırırken: api/MuhtarIslem/sakinler-listesi
        [HttpGet("sakinler-listesi")]
        public async Task<IActionResult> GetSakinler()
        {
            var liste = await _context.Sakinler
                .Select(s => new {
                    id = s.Id, // React 's.id' olarak bekliyor
                    adSoyad = s.Ad + " " + s.Soyad, // React 's.adSoyad' olarak bekliyor
                    tcNo = s.TCNo
                }).ToListAsync();
            return Ok(liste);
        }

        // 2. YENİ İŞLEM KAYDET
        [HttpPost]
        public async Task<IActionResult> PostIslem(IslemEkleDto model)
        {
            var yeniIslem = new MuhtarlikIslem
            {
                SakinId = model.SakinId,
                IslemAdi = model.IslemAdi,
                Kategori = model.Kategori,
                HarcTutari = model.HarcTutari,
                Aciklama = model.Aciklama,
                EvrakKayitNo = model.EvrakKayitNo,
                IslemTarihi = DateTime.Now 
            };

            _context.MuhtarlikIslemleri.Add(yeniIslem);
            await _context.SaveChangesAsync();

            return Ok(new { mesaj = "İşlem kaydedildi!", id = yeniIslem.Id });
        }

        // 3. TÜM ARŞİVİ LİSTELE
        // React tarafından çağırırken: api/MuhtarIslem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IslemListeDto>>> GetTumIslemler()
        {
            return await _context.MuhtarlikIslemleri
                .Include(i => i.Sakin)
                .OrderByDescending(i => i.IslemTarihi)
                .Select(i => new IslemListeDto
                {
                    Id = i.Id,
                    SakinAdSoyad = i.Sakin.Ad + " " + i.Sakin.Soyad,
                    IslemAdi = i.IslemAdi,
                    Kategori = i.Kategori,
                    HarcTutari = i.HarcTutari,
                    IslemTarihi = i.IslemTarihi,
                    EvrakKayitNo = i.EvrakKayitNo
                })
                .ToListAsync();
        }

        // 4. RAPOR
        [HttpGet("rapor")]
        public async Task<IActionResult> GetRapor()
        {
            var rapor = await _context.MuhtarlikIslemleri
                .GroupBy(i => i.IslemAdi)
                .Select(g => new IslemRaporDto
                {
                    Islem = g.Key,
                    Adet = g.Count(),
                    ToplamHarc = g.Sum(x => x.HarcTutari)
                })
                .ToListAsync();

            return Ok(rapor);
        }
    }
}