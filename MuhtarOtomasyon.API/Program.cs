using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using MuhtarOtomasyon.API.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Veritabaný Servisini Ekle (En üste)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. JSON Döngülerini Engelle (Ýliþkili verilerde hata almamak için)
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", b => b.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// SIRALAMA ÇOK ÖNEMLÝ:
app.UseHttpsRedirection();

// BURAYI DÜZELTTÝK: Ýsim yukarýdakiyle (AllowAll) ayný olmalý
app.UseCors("AllowAll");

app.UseAuthorization();
app.MapControllers();
app.Run();
