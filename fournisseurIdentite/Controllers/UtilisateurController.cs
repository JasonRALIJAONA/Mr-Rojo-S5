using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using fournisseurIdentite.Services;
using fournisseurIdentite.src.DTO;
using fournisseurIdentite.Models;
using fournisseurIdentite.src.Utils;
using Microsoft.Extensions.Caching.Memory;

namespace fournisseurIdentite.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UtilisateurController : ControllerBase
{
    private const string PinSessionKey = "Pin";
    private const string PinExpirationSessionKey = "PinExpiration";
    private readonly FournisseurIdentiteContext _context;
     private readonly IPasswordService _passwordService;
     private readonly EmailService _emailService;
     private readonly PINService _pinService;
    private readonly UtilisateurService _service;
    // Simuler une base de données (en mémoire)
    private readonly IMemoryCache _cache;
    
    public UtilisateurController(IPasswordService passwordService, EmailService emailService, FournisseurIdentiteContext context, PINService pinservice, UtilisateurService service,IMemoryCache memoryCache) 
    {
        _context = context;
        _passwordService = passwordService;
        _pinService = pinservice;
        _emailService = emailService;
        _service = service;
        _cache = memoryCache;
    }

    [HttpPost("inscription")]
    public async Task<IActionResult> Inscription([FromBody] UsersRequest user){

        Console.WriteLine(user+"  h");
        Utilisateur users = new()
        {
            NomUtilisateur = user.Username,
            Email = user.Email,
            MotDePasse = _passwordService.HashPassword(user.Password ?? "")
        };
        Console.WriteLine(users);

        // TO DO : save to database 
        await _context.Utilisateurs.AddAsync(users);
        await _context.SaveChangesAsync();
        await _emailService.SendEmailAsync(users.Email ?? "", "Validation du compte", EmailBuilder.buildValidationMail(users.Id, users.NomUtilisateur ?? ""));
        return Ok("Compte créé");
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        if (string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
            return BadRequest("Email ou mot de passe manquant.");

        var user = _context.Utilisateurs.FirstOrDefault(u => u.Email == loginRequest.Email);
        if (user == null)
            return Unauthorized("Utilisateur non trouvé.");

        if (user.NbTentative >= 3)
            return Unauthorized("Compte verrouillé après plusieurs tentatives. Veuillez réinitialiser votre mot de passe.");

        var isPasswordValid = _passwordService.VerifyPassword(loginRequest.Password, user.MotDePasse ?? "");
        if (!isPasswordValid)
        {
            _service.AddTentative(loginRequest.Email);
            return Unauthorized("Email ou mot de passe incorrect.");
        }

        _service.ReinitializeTentative(loginRequest.Email);

        string pin = _pinService.CreatePIN(5);

        Console.WriteLine("hito le pin "+ pin);

        // Stocker le PIN dans le cache pour 90 secondes
        _cache.Set(user.Email, pin, TimeSpan.FromSeconds(90));

        // Envoyer l'e-mail avec le PIN
        await _emailService.SendEmailAsync(user.Email ?? "", "Validation du compte", EmailBuilder.buildPINMail(pin, user.NomUtilisateur ?? ""));

        return Ok(new { message = "Un PIN a été envoyé pour validation. Vous avez 90 secondes pour le valider." });
    }

    [HttpPost("validerPin")]
    public IActionResult ValiderPin([FromBody] PinValidationRequest request)
    {
        if (!_cache.TryGetValue(request.Email, out string? cachedPin))
        {
            return Unauthorized("PIN non trouvé ou expiré.");
        }

        var user = _context.Utilisateurs.FirstOrDefault(u => u.Email == request.Email);
        if (user == null)
            return NotFound("Utilisateur non trouvé.");

        if (user.NbTentative >= 3)
            return Unauthorized("Compte verrouillé après plusieurs tentatives. Veuillez réinitialiser votre mot de passe.");

        if (cachedPin != request.Pin)
        {
            _service.AddTentative(user.Email ?? "");
            return Unauthorized("PIN incorrect.");
        }

        _service.ReinitializeTentative(user.Email ?? "");
        _cache.Remove(request.Email); // Supprimer le PIN une fois validé

        var userData = new
        {
            user.Id,
            user.NomUtilisateur,
            user.Email
        };

        return Ok(userData);
    }



    [HttpGet("formValiderIncription")]
    public IActionResult ValiderForm([FromQuery] int id)
    {
        return Content($@"
            <html>
            <body>
                <form action='/api/users/valider' method='post'>
                    <input type='hidden' name='id' value='{id}' />
                    <p>Cliquez sur le bouton pour valider votre compte :</p>
                    <button type='submit'>Valider mon compte</button>
                </form>
            </body>
            </html>", "text/html");
    }

    [HttpPost("validerCompte")]
    public async Task<IActionResult> ValiderUtilisateur([FromForm] int id)
    {
        Utilisateur user = new ();
        Console.WriteLine(id);
        // TODO: Get user by id 
        var utilisateur = await _context.Utilisateurs.FindAsync(id);

        if (utilisateur == null)
        {
            return NotFound(new { message = "Utilisateur non trouvé." });
        }

        if (utilisateur.EstValide ?? false)
        {
            return BadRequest(new { message = "Utilisateur déjà validé." });
        }


        // Fonction 
        utilisateur.EstValide = true;

        // Valider changement
        await _context.SaveChangesAsync();

        await Task.CompletedTask;
        return Ok(new { message = "Compte validé avec succès." });
    }

    [HttpPost("inserer")]
     public IActionResult CreateUtilisateur([FromBody] Utilisateur utilisateur)
    {
        
        try
        {
            var insertedUser = _service.CreateUtilisateur(utilisateur);
            return Ok(insertedUser);
        }
        catch (Exception ex)
        {
            return BadRequest($"Error: {ex.Message}, Inner Exception: {ex.InnerException?.Message}");
        }
    }

   [HttpPut("update-info")]
    public IActionResult UpdateUtilisateur([FromBody] UpdateUtilisateurDto dto)
    {
        if (dto == null)
        {
            return BadRequest("dto object is null.");
        }

        try
        {
           var utilisateur = _service.UpdateUtilisateur(dto);
        return Ok(utilisateur);
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(ex.Message);
        }
        catch (ArgumentNullException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok("Test");
    }

}
