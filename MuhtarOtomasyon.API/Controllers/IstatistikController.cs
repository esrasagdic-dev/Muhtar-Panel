using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MuhtarOtomasyon.API.Data;
using MuhtarOtomasyon.API.DTOs.IstatistikDto;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace MuhtarOtomasyon.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IstatistikController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IstatistikController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("ozet")]
        public async Task<IActionResult> GetOzet()
        {
            try
            {
                // 1. Dinamik Sayımlar (Sakinler ve İhtiyaç Sahipleri)
                var sakinSayisi = await _context.Sakinler.CountAsync();
                var engelliSayisi = await _context.Sakinler.CountAsync(s => s.EngelDurumu == true);
                var ihtiyacSayisi = await _context.IhtiyacSahipleri.CountAsync();

                // 2. Sokak Bazlı Nüfus Sayımı (İlk 5 Sokak)
                var sokakVerileri = await _context.Sokaklar
                    .Select(s => new
                    {
                        Sokak = s.Ad,
                        KisiSayisi = _context.Sakinler.Count(x => x.SokakId == s.SokakId)
                    })
                    .OrderByDescending(x => x.KisiSayisi)
                    .Take(5)
                    .ToListAsync();

                // 3. Veritabanındaki Sabit Mahalle Bilgisi
                var mahalle = await _context.Istatistikler.FirstOrDefaultAsync();

                // 4. DTO'ya Atama (Hatasız ve Temiz)
                var ozet = new IstatistikOzetDto
                {
                    // Mahalle verisi yoksa varsayılan Tepebaşı/Ömerağa verilerini basar
                    GenelNufus = mahalle != null ? mahalle.ToplamNufus : 9346,
                    GenelKonutSayisi = mahalle != null ? mahalle.KonutSayisi : 4437,
                    GenelYogunluk = mahalle != null ? (double)mahalle.NufusYogunlugu : 38328.40,
                    GenelHaneGeliri = mahalle != null ? (decimal)mahalle.OrtalamaHaneGeliri : 54711.00m,

                    // Sistemdeki kayıtlar
                    KayitliSakinSayisi = sakinSayisi,
                    EngelliSakinSayisi = engelliSayisi,
                    IhtiyacSahibiSayisi = ihtiyacSayisi,

                    // Sokak listesini paketle
                    EnKalabalikSokaklar = sokakVerileri.Cast<object>().ToList(),
                    SonGuncellemeTarihi = DateTime.Now.ToString("dd.MM.yyyy HH:mm")
                };

                return Ok(ozet);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"İstatistik yüklenirken hata oluştu: {ex.Message}");
            }
        }
    }
}