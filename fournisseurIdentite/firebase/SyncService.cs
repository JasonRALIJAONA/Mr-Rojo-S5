namespace fournisseurIdentite.firebase
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using fournisseurIdentite.Models;
    using Google.Cloud.Firestore;
    using Microsoft.EntityFrameworkCore;

    public class SyncService
    {
        private readonly FirestoreDb _firestoreDb;
        private readonly FournisseurIdentiteContext _dbContext;

        public SyncService(FournisseurIdentiteContext dbContext)
        {
            _firestoreDb = FirestoreDb.Create("prise-main");
            _dbContext = dbContext;
        }

        public async Task SyncUtilisateursToFirestore()
        {
            var utilisateurs = await _dbContext.Utilisateurs.ToListAsync();
            CollectionReference utilisateursCollection = _firestoreDb.Collection("Utilisateur_idp");

            foreach (var utilisateur in utilisateurs)
            {
                DocumentReference docRef = utilisateursCollection.Document(utilisateur.Id.ToString());
                await docRef.SetAsync(utilisateur);
                Console.WriteLine($"Synchronized utilisateur: {utilisateur.Id}");
            }
        }
    }
}