using fournisseurIdentite.firebase;
using fournisseurIdentite.Models;
using fournisseurIdentite.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// FirebaseConfig.Initialize();

// Configuration de la politique CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")  // Frontend autorisé
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials(); // Si vous avez besoin des cookies ou des sessions
        });
});

// Configuration des services
builder.Services.AddControllersWithViews();
builder.Services.AddScoped<EmailService>(provider => new EmailService(
    "smtp.gmail.com",       // Serveur SMTP
    587,                    // Port SMTP
    "jasonralijaona@gmail.com", // Utilisateur SMTP
    "ngddkrpplobkmkzj"      // Mot de passe SMTP
));
builder.Services.AddScoped<IPasswordService, PasswordService>();
builder.Services.AddScoped<PINService>();

// Configuration de la gestion des sessions
builder.Services.AddDistributedMemoryCache(); // Nécessaire pour stocker les sessions en mémoire
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(90); // Durée de validité des sessions
    options.Cookie.HttpOnly = true;                // Sécurise l'accès cookie côté serveur
    options.Cookie.IsEssential = true;             // Essentiel pour les fonctionnalités critiques
});

// Configuration de Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuration de la base de données
builder.Services.AddDbContext<FournisseurIdentiteContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IPasswordService, PasswordService>();
builder.Services.AddScoped<UtilisateurService>();
builder.Services.AddScoped<SyncService>();
builder.Services.AddScoped<FirebaseConfig>();


builder.Services.AddMemoryCache();

var app = builder.Build();

// Resolve FirestoreListener and call ListenToUtilisateurCollection
using (var scope = app.Services.CreateScope())
{
    var FirebaseConfig = scope.ServiceProvider.GetRequiredService<FirebaseConfig>();

    FirebaseConfig.Initialize();    
}

// Configuration du pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

// Utilisation de CORS
app.UseCors("AllowFrontend");

// Utilisation de la session (Doit être avant UseRouting)
app.UseSession();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

// Exemple d'API simple
var summaries = new[] 
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
