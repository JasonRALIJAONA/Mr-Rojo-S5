namespace fournisseurIdentite.firebase
{
    using System;
    using fournisseurIdentite.Models;
    using Google.Cloud.Firestore;
    using Microsoft.EntityFrameworkCore;

    public class FirestoreListener
    {
        private readonly FirestoreDb _firestoreDb;
        private readonly FournisseurIdentiteContext _dbContext;

        public FirestoreListener(FournisseurIdentiteContext dbContext)
        {
            _firestoreDb = FirestoreDb.Create("prise-main");
            _dbContext = dbContext;
        }

        public void ListenToUtilisateurCollection()
        {
            CollectionReference utilisateursCollection = _firestoreDb.Collection("Utilisateur_idp");
            utilisateursCollection.Listen(snapshot =>
            {
                foreach (DocumentChange change in snapshot.Changes)
                {
                    switch (change.ChangeType)
                    {
                        case DocumentChange.Type.Added:
                            HandleAddedDocument(change.Document);
                            break;
                        case DocumentChange.Type.Modified:
                            HandleModifiedDocument(change.Document);
                            break;
                        case DocumentChange.Type.Removed:
                            HandleRemovedDocument(change.Document);
                            break;
                    }
                }
            });
        }

        private void HandleAddedDocument(DocumentSnapshot document)
        {
            var utilisateur = document.ConvertTo<Utilisateur>();
            _dbContext.Utilisateurs.Add(utilisateur);
            _dbContext.SaveChanges();
            Console.WriteLine($"New utilisateur added: {document.Id}");
        }

        private void HandleModifiedDocument(DocumentSnapshot document)
        {
            var utilisateur = document.ConvertTo<Utilisateur>();
            _dbContext.Utilisateurs.Update(utilisateur);
            _dbContext.SaveChanges();
            Console.WriteLine($"Modified utilisateur: {document.Id}");
        }

        private void HandleRemovedDocument(DocumentSnapshot document)
        {
            var utilisateur = _dbContext.Utilisateurs.Find(document.Id);
            if (utilisateur != null)
            {
                _dbContext.Utilisateurs.Remove(utilisateur);
                _dbContext.SaveChanges();
                Console.WriteLine($"Removed utilisateur: {document.Id}");
            }
        }
    }
}