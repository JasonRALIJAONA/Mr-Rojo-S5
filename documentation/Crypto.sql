\c postgres;
DROP DATABASE crypto;
CREATE DATABASE crypto;
\c crypto;

CREATE TABLE utilisateur(
   id SERIAL,
   nom_utilisateur VARCHAR(50)  NOT NULL,
   email VARCHAR(50)  NOT NULL,
   mot_de_passe VARCHAR(255)  NOT NULL,
   token VARCHAR(255)  NOT NULL,
   date_creation_compte TIMESTAMP NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(nom_utilisateur),
   UNIQUE(email)
);

CREATE TABLE cryptomonnaie(
   id SERIAL,
   symbole VARCHAR(10) ,
   nom VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(symbole),
   UNIQUE(nom)
);

CREATE TABLE portefeuille(
   id SERIAL,
   montant NUMERIC(15,8)  ,
   id_cryptomonnaie INTEGER NOT NULL,
   id_utilisateur INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_cryptomonnaie) REFERENCES cryptomonnaie(id),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id)
);

CREATE TABLE transaction(
   id SERIAL,
   montant NUMERIC(15,8)  ,
   est_valide BOOLEAN,
   date_transaction TIMESTAMP,
   id_cryptomonnaie INTEGER NOT NULL,
   id_vendeur INTEGER NOT NULL,
   id_acheteur INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_cryptomonnaie) REFERENCES cryptomonnaie(id),
   FOREIGN KEY(id_vendeur) REFERENCES utilisateur(id),
   FOREIGN KEY(id_acheteur) REFERENCES utilisateur(id)
);

CREATE TABLE mvt_fond(
   id SERIAL,
   depot NUMERIC(15,8)  ,
   retrait NUMERIC(15,8)  ,
   date_mvt TIMESTAMP,
   id_utilisateur INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id)
);

CREATE TABLE cours_crypto(
   id SERIAL,
   date_cours TIMESTAMP NOT NULL,
   montant INTEGER NOT NULL,
   id_cryptomonnaie INTEGER NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(date_cours),
   FOREIGN KEY(id_cryptomonnaie) REFERENCES cryptomonnaie(id)
);

CREATE TABLE validation_mvt(
   id SERIAL,
   date_validation DATE NOT NULL,
   id_utilisateur INTEGER NOT NULL,
   id_mvt_fond INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id),
   FOREIGN KEY(id_mvt_fond) REFERENCES mvt_fond(id)
);

CREATE OR REPLACE VIEW v_fond_actuel as 
SELECT id_utilisateur, SUM(depot) - SUM(retrait) as fond_actuel 
FROM mvt_fond GROUP BY id_utilisateur;