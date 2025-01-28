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

CREATE TABLE cours_crypto(
   id serial PRIMARY KEY,
   date_cours TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   montant decimal(15,8),
   cryptomonnaie_id INTEGER REFERENCES cryptomonnaie(id)
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
    montant DECIMAL(15, 8) DEFAULT 0,,
    est_valide BOOLEAN DEFAULT FALSE,
    date_transaction TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mvt_fond (
    id SERIAL PRIMARY KEY,
    utilisateur_id INTEGER REFERENCES utilisateur(id),
    depot DECIMAL(15, 8) DEFAULT 0,,
    retrait DECIMAL(15, 8) DEFAULT 0,,
    date_mvt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE VIEW v_fond_actuel as 
SELECT utilisateur_id, SUM(depot) - SUM(retrait) as fond_actuel 
FROM mvt_fond;


INSERT INTO utilisateur (nom_utilisateur, email, mot_de_passe, token) VALUES
('johndoe', 'johndoe@example.com', 'hashed_password_123', 'token_abc123'),
('janedoe', 'janedoe@example.com', 'hashed_password_456', 'token_def456'),
('alexsmith', 'alexsmith@example.com', 'hashed_password_789', 'token_ghi789');

INSERT INTO cryptomonnaie (nom, symbole) VALUES
('Bitcoin', 'BTC'),
('Ethereum', 'ETH'),
('Cardano', 'ADA');

INSERT INTO portefeuille (utilisateur_id, cryptomonnaie_id, montant) VALUES
(1, 1, 0.5),
(1, 2, 2.0),
(2, 1, 1.0),
(3, 3, 10.0);

INSERT INTO transaction (vendeur_id, acheteur_id, cryptomonnaie_id, montant, est_valide) VALUES
(1, 2, 1, 0.1, TRUE),
(2, 3, 2, 1.5, FALSE);

INSERT INTO mvt_fond (utilisateur_id, depot, retrait) VALUES
(1, 1000.0, 0.0),
(2, 0.0, 200.0),
(3, 500.0, 50.0);
