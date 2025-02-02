CREATE DATABASE fournisseur_identite;
\c fournisseur_identite;

CREATE TABLE utilisateur(
    id serial PRIMARY KEY, 
    nom_utilisateur varchar(50) unique,
    email varchar(50) unique,
    mot_de_passe varchar(100) not null,
    est_valide boolean default false,
    nb_tentative integer default 0
);

\c postgres;

CREATE DATABASE crypto;
\c crypto;

CREATE TABLE cryptomonnaie(
   id SERIAL,
   symbole VARCHAR(10) ,
   nom VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(symbole),
   UNIQUE(nom)
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

CREATE TABLE Role(
   id SERIAL,
   role VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE utilisateur(
   id SERIAL,
   nom_utilisateur VARCHAR(50)  NOT NULL,
   nom VARCHAR(50)  NOT NULL,
   prenom VARCHAR(50)  NOT NULL,
   dtn DATE NOT NULL,
   email VARCHAR(50)  NOT NULL,
   token VARCHAR(255)  NOT NULL,
   date_creation_compte TIMESTAMP NOT NULL,
   id_role INTEGER NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(nom_utilisateur),
   UNIQUE(email),
   FOREIGN KEY(id_role) REFERENCES Role(id)
);

CREATE TABLE portefeuille(
   id SERIAL,
   montant INTEGER NOT NULL,
   id_cryptomonnaie INTEGER NOT NULL,
   id_utilisateur INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_cryptomonnaie) REFERENCES cryptomonnaie(id),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id)
);

CREATE TABLE transaction(
   id SERIAL,
   est_valide BOOLEAN,
   achat NUMERIC(15,2)  ,
   vente NUMERIC(15,2)  ,
   prix_unitaire NUMERIC(15,2)   NOT NULL,
   quantite INTEGER NOT NULL,
   date_transaction TIMESTAMP,
   id_cryptomonnaie INTEGER NOT NULL,
   id_utilisateur INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_cryptomonnaie) REFERENCES cryptomonnaie(id),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id)
);

CREATE TABLE mvt_fond(
   id SERIAL,
   depot NUMERIC(15,8)  ,
   retrait NUMERIC(15,8)  ,
   date_mvt TIMESTAMP NOT NULL,
   id_utilisateur INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id)
);
CREATE OR REPLACE VIEW V_detail_mvt_fond AS 
SELECT MVT_fond.*, utilisateur.nom_utilisateur
FROM Mvt_fond JOIN Utilisateur on utilisateur.id=mvt_fond.id_utilisateur;

CREATE TABLE validation_mvt(
   id SERIAL,
   date_validation TIMESTAMP NOT NULL,
   id_utilisateur INTEGER NOT NULL,
   id_mvt_fond INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id),
   FOREIGN KEY(id_mvt_fond) REFERENCES mvt_fond(id)
);


-- Vue pour le fond actuel de chaque utilisateur
CREATE OR REPLACE VIEW v_fond_actuel AS
SELECT 
    mf.id_utilisateur,
    COALESCE(SUM(mf.depot) - SUM(mf.retrait), 0) AS fond_actuel
FROM 
    mvt_fond mf
JOIN 
    validation_mvt vm ON mf.id = vm.id_mvt_fond
GROUP BY 
    mf.id_utilisateur;

-- Contrainte pour empêcher les retraits si les fonds actuels sont insuffisants
CREATE OR REPLACE FUNCTION verifier_fonds_avant_retrait() 
RETURNS TRIGGER AS $$
DECLARE
    fonds_actuels NUMERIC;
BEGIN
    -- Calcul des fonds actuels
    SELECT COALESCE(SUM(depot) - SUM(retrait), 0) 
    INTO fonds_actuels
    FROM mvt_fond
    JOIN validation_mvt ON mvt_fond.id = validation_mvt.id_mvt_fond
    WHERE mvt_fond.id_utilisateur = NEW.id_utilisateur;

    -- Vérification du retrait
    IF (NEW.retrait IS NOT NULL AND NEW.retrait > 0) THEN
        IF fonds_actuels < NEW.retrait THEN
            RAISE EXCEPTION 'Fonds insuffisants pour effectuer le retrait. Fonds actuels: %', fonds_actuels;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour protéger contre les retraits non autorisés
DROP TRIGGER IF EXISTS trg_verifier_fonds_avant_retrait ON mvt_fond;

CREATE TRIGGER trg_verifier_fonds_avant_retrait
BEFORE INSERT OR UPDATE ON mvt_fond
FOR EACH ROW
EXECUTE FUNCTION verifier_fonds_avant_retrait();


-- Insérer des rôles
INSERT INTO Role (role) VALUES ('Utilisateur'), ('Administrateur');

-- Insérer des utilisateurs
INSERT INTO utilisateur (nom_utilisateur, nom, prenom, dtn, email, token, date_creation_compte, id_role) 
VALUES 
('user1', 'Nom1', 'Prenom1', '1995-01-01', 'user1@example.com', 'token1', NOW(), 1),
('user2', 'Nom2', 'Prenom2', '1996-02-02', 'user2@example.com', 'token2', NOW(), 1),
('user3', 'Nom3', 'Prenom3', '1997-03-03', 'user3@example.com', 'token3', NOW(), 1),
('user4', 'Nom4', 'Prenom4', '1998-04-04', 'user4@example.com', 'token4', NOW(), 1),
('user5', 'Nom5', 'Prenom5', '1999-05-05', 'user5@example.com', 'token5', NOW(), 1),
('user6', 'Nom6', 'Prenom6', '2000-06-06', 'user6@example.com', 'token6', NOW(), 1),
('user7', 'Nom7', 'Prenom7', '2001-07-07', 'user7@example.com', 'token7', NOW(), 1),
('user8', 'Nom8', 'Prenom8', '2002-08-08', 'user8@example.com', 'token8', NOW(), 1),
('user9', 'Nom9', 'Prenom9', '2003-09-09', 'user9@example.com', 'token9', NOW(), 1),
('user10', 'Nom10', 'Prenom10', '2004-10-10', 'user10@example.com', 'token10', NOW(), 1),
('admin1', 'AdminNom', 'AdminPrenom', '1990-01-01', 'admin@example.com', 'admintoken', NOW(), 2);

-- Insérer des cryptomonnaies
INSERT INTO cryptomonnaie (symbole, nom) 
VALUES 
('LTC', 'Litecoin'),
('XRP', 'Ripple'),
('ADA', 'Cardano'),
('SOL', 'Solana'),
('DOGE', 'Dogecoin'),
('DOT', 'Polkadot'),
('MATIC', 'Polygon'),
('BCH', 'Bitcoin Cash'),
('XLM', 'Stellar'),
('AVAX', 'Avalanche');

-- Insérer des mouvements de fonds validés
INSERT INTO mvt_fond (depot, retrait, date_mvt, id_utilisateur) 
VALUES 
(1000.00, 0.00, NOW(), 1); 
INSERT INTO mvt_fond (depot, retrait, date_mvt, id_utilisateur) 
VALUES 
(2000.00, 0.00, NOW(), 2); 
INSERT INTO mvt_fond (depot, retrait, date_mvt, id_utilisateur) 
VALUES 
(1500.00, 0.00, NOW(), 3); 
INSERT INTO mvt_fond (depot, retrait, date_mvt, id_utilisateur) 
VALUES 
(3000.00, 0.00, NOW(), 4);
INSERT INTO mvt_fond (depot, retrait, date_mvt, id_utilisateur) 
VALUES 
(0.00, 500.00, NOW(), 5);

INSERT INTO validation_mvt (date_validation, id_utilisateur, id_mvt_fond) 
VALUES 
(NOW(), 1, 1);
INSERT INTO validation_mvt (date_validation, id_utilisateur, id_mvt_fond) 
VALUES 
(NOW(), 2, 2);
INSERT INTO validation_mvt (date_validation, id_utilisateur, id_mvt_fond) 
VALUES 
(NOW(), 3, 3);
INSERT INTO validation_mvt (date_validation, id_utilisateur, id_mvt_fond) 
VALUES 
(NOW(), 4, 4);

-- Insérer des portefeuilles
INSERT INTO portefeuille (montant, id_cryptomonnaie, id_utilisateur) 
VALUES 
(500, 1, 1), 
(300, 2, 2),
(800, 1, 3),
(400, 2, 4),
(600, 1, 5);
