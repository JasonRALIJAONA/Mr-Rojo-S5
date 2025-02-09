namespace fournisseurIdentite.firebase;

using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
public class FirebaseConfig
{
    public static void Initialize()
    {
        string basePath = Directory.GetCurrentDirectory();
        Console.WriteLine(basePath);
        string relativePath = Path.Combine(basePath,"..", "crypto", "src", "main", "resources", "firebase-service-account.json");

        FirebaseApp.Create(new AppOptions()
        {
            Credential = GoogleCredential.FromFile(relativePath)
        });
    }
}

