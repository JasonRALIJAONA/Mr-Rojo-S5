\c Postgres;

DROP DATABASE crypto;
CREATE DATABASE crypto;
\c crypto;

CREATE TABLE utilisateur (
    id SERIAL PRIMARY KEY,
    nom_utilisateur VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    date_creation_compte TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cryptomonnaie (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) UNIQUE,
    symbole VARCHAR(10) UNIQUE
);

CREATE TABLE portefeuille (
    id SERIAL PRIMARY KEY,
    utilisateur_id INTEGER REFERENCES utilisateur(id) ON DELETE CASCADE,
    cryptomonnaie_id INTEGER REFERENCES cryptomonnaie(id),
    montant DECIMAL(15, 8) DEFAULT 0
);

CREATE TABLE transaction (
    id SERIAL PRIMARY KEY,
    vendeur_id INTEGER REFERENCES utilisateur(id),
    acheteur_id INTEGER REFERENCES utilisateur(id),
    cryptomonnaie_id INTEGER REFERENCES cryptomonnaie(id),
    montant VARCHAR(10),
    est_valide BOOLEAN DEFAULT FALSE,
    date_transaction TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mvt_fond (
    id SERIAL PRIMARY KEY,
    utilisateur_id INTEGER REFERENCES utilisateur(id),
    depot VARCHAR(10),
    retrait VARCHAR(10),
    montant DECIMAL(15, 2),
    date_mvt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE VIEW v_fond_actuel as 
SELECT utilisateur_id, SUM(depot) - SUM(retrait) as fond_actuel 
FROM mvt_fond;

