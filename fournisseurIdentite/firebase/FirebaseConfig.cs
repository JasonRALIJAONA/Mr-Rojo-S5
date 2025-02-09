namespace fournisseurIdentite.firebase;

using FirebaseAdmin;
using FirebaseAdmin.Auth;
using fournisseurIdentite.Models;
using Google.Apis.Auth.OAuth2;
using System;
using System.IO;

public class FirebaseConfig
{
    private readonly FournisseurIdentiteContext _dbContext;

    public FirebaseConfig(FournisseurIdentiteContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async void Initialize()
    {
        string basePath = Directory.GetCurrentDirectory();
        string relativePath = Path.Combine(basePath,"firebase","firebase-service-deux.json");
        string fullPath = Path.GetFullPath(relativePath);
        // fullPath = "firebase-service-deux.json";

        Console.WriteLine($"Resolved path: {fullPath}");

        if (!File.Exists(fullPath))
        {
            throw new FileNotFoundException("The Firebase service account key file was not found.", fullPath);
        }

        if (FirebaseApp.DefaultInstance == null)
        {
            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile(fullPath)
            });
        }

        List<Utilisateur> utilisateurs = [.. _dbContext.Utilisateurs];


        foreach (var utilisateur in utilisateurs)
        {
            // Create user in Firebase Authentication
                var userArgs = new UserRecordArgs
                {
                    Email = utilisateur.Email,
                    Password = utilisateur.MotDePasse,
                    EmailVerified = true,
                    Disabled = false,
                };
                try
                {
                    var userRecord = await FirebaseAuth.DefaultInstance.CreateUserAsync(userArgs);
                    Console.WriteLine($"Successfully created user: {userRecord.Uid}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error creating user: {ex.Message}");
                }
        }

    }

    public async void CreateFirebaseUser (Utilisateur utilisateur)
    {
        string basePath = Directory.GetCurrentDirectory();
        string relativePath = Path.Combine(basePath, "firebase","firebase-service-deux.json");
        string fullPath = Path.GetFullPath(relativePath);
        // fullPath = "firebase-service-deux.json";

        Console.WriteLine($"Resolved path: {fullPath}");

        if (!File.Exists(fullPath))
        {
            throw new FileNotFoundException("The Firebase service account key file was not found.", fullPath);
        }

         if (FirebaseApp.DefaultInstance == null)
        {
            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile(fullPath)
            });
        }

        var userArgs = new UserRecordArgs
        {
            Email = utilisateur.Email,
            Password = utilisateur.MotDePasse,
            EmailVerified = true,
            Disabled = false,
        };

        try
        {
            var userRecord = await FirebaseAuth.DefaultInstance.CreateUserAsync(userArgs);
            Console.WriteLine($"Successfully created user: {userRecord.Uid}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error creating user: {ex.Message}");
        }
    }
}