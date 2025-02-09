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

-- Insérer des utilisateurs avec des données réalistes
INSERT INTO utilisateur (nom_utilisateur, email, mot_de_passe, est_valide, nb_tentative) 
VALUES 
('lucas_martin', 'lucas.martin@yopmail.com', 'Gp5RF+Ilc8GWG6+OZLkUBn0SVFSwU+aHt1yr6fwlunAb8yccFbnIWh2pBhBzki6i', true, 0), --motdepasse123
('sophie_durand', 'sophie.durand@yopmail.com', 'Gp5RF+Ilc8GWG6+OZLkUBn0SVFSwU+aHt1yr6fwlunAb8yccFbnIWh2pBhBzki6i', true, 0),
('julien_bernard', 'julien.bernard@yopmail.com', 'Gp5RF+Ilc8GWG6+OZLkUBn0SVFSwU+aHt1yr6fwlunAb8yccFbnIWh2pBhBzki6i', true, 0),
('caroline_lemoine', 'caroline.lemoine@yopmail.com', 'Gp5RF+Ilc8GWG6+OZLkUBn0SVFSwU+aHt1yr6fwlunAb8yccFbnIWh2pBhBzki6i', true, 0),
('nicolas_dubois', 'nicolas.dubois@yopmail.com', 'Gp5RF+Ilc8GWG6+OZLkUBn0SVFSwU+aHt1yr6fwlunAb8yccFbnIWh2pBhBzki6i', true, 0),
('maria_roux', 'maria.roux@yopmail.com', 'Gp5RF+Ilc8GWG6+OZLkUBn0SVFSwU+aHt1yr6fwlunAb8yccFbnIWh2pBhBzki6i', true, 0),
('olivier_fournier', 'olivier.fournier@yopmail.com', 'Gp5RF+Ilc8GWG6+OZLkUBn0SVFSwU+aHt1yr6fwlunAb8yccFbnIWh2pBhBzki6i', true, 0),
('amelie_pires', 'amelie.pires@yopmail.com', 'Gp5RF+Ilc8GWG6+OZLkUBn0SVFSwU+aHt1yr6fwlunAb8yccFbnIWh2pBhBzki6i', true, 0),
('thomas_morand', 'thomas.morand@yopmail.com', 'Gp5RF+Ilc8GWG6+OZLkUBn0SVFSwU+aHt1yr6fwlunAb8yccFbnIWh2pBhBzki6i', true, 0),
('marie_dumont', 'marie.dumont@yopmail.com', 'Gp5RF+Ilc8GWG6+OZLkUBn0SVFSwU+aHt1yr6fwlunAb8yccFbnIWh2pBhBzki6i', true, 0),
('admin_girard', 'admin.girard@yopmail.com', 'QzhtUv12c/OtkjUfPBb7ojAIJGdoYQsnI8QwGtjvBmzpeAdyrptR/AMr2I0bbFCX', true, 0); --adminpass123

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
   token VARCHAR(255),
   date_expiration TIMESTAMP,
   date_creation_compte TIMESTAMP NOT NULL,
   id_role INTEGER NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(nom_utilisateur),
   UNIQUE(email),
   FOREIGN KEY(id_role) REFERENCES Role(id)
);

CREATE TABLE transaction(
   id SERIAL,
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
CREATE TABLE favori(
    id SERIAL PRIMARY KEY,
    date_ajout TIMESTAMP,
    id_cryptomonnaie INTEGER REFERENCES cryptomonnaie(id),
    id_utilisateur INTEGER REFERENCES utilisateur(id)
);

-- Vue pour le Porte_feuille 
CREATE VIEW v_porte_feuille AS
SELECT 
    t.id_utilisateur,
    t.id_cryptomonnaie,
    c.nom AS nom_cryptomonnaie,
    c.symbole AS symbole_cryptomonnaie,
    COALESCE(SUM(t.achat - t.vente), 0) AS quantite_totale
FROM transaction t
JOIN cryptomonnaie c ON t.id_cryptomonnaie = c.id
GROUP BY t.id_utilisateur, t.id_cryptomonnaie, c.nom, c.symbole;

CREATE TABLE photo_utilisateur(
    id SERIAL PRIMARY KEY,
    date_changement TIMESTAMP NOT NULL,
    lien_photo VARCHAR(255) NOT NULL,
    id_utilisateur INTEGER REFERENCES utilisateur(id)
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

CREATE VIEW v_cours_crypto_actuel AS
SELECT c.id AS id_cryptomonnaie,
       c.nom AS nom_cryptomonnaie,
       c.symbole AS symbole_cryptomonnaie,
       co.montant AS prix_actuel
FROM cryptomonnaie c
JOIN (
    SELECT id_cryptomonnaie, montant, date_cours
    FROM cours_crypto
    WHERE (id_cryptomonnaie, date_cours) IN (
        SELECT id_cryptomonnaie, MAX(date_cours)
        FROM cours_crypto
        GROUP BY id_cryptomonnaie
    )
) co ON c.id = co.id_cryptomonnaie;

-- Insérer des rôles
INSERT INTO Role (role) VALUES ('Utilisateur'), ('Administrateur');

-- Insérer des utilisateurs
INSERT INTO utilisateur (nom_utilisateur, nom, prenom, dtn, email, date_creation_compte, id_role) 
VALUES 
('lucas_martin', 'Martin', 'Lucas', '1988-03-22', 'lucas.martin@yopmail.com', NOW(), 1),
('sophie_durand', 'Durand', 'Sophie', '1990-07-15', 'sophie.durand@yopmail.com', NOW(), 1),
('julien_bernard', 'Bernard', 'Julien', '1992-11-05', 'julien.bernard@yopmail.com', NOW(), 1),
('caroline_lemoine', 'Lemoine', 'Caroline', '1995-02-28', 'caroline.lemoine@yopmail.com', NOW(), 1),
('nicolas_dubois', 'Dubois', 'Nicolas', '1997-09-12', 'nicolas.dubois@yopmail.com', NOW(), 1),
('maria_roux', 'Roux', 'Maria', '1994-05-06', 'maria.roux@yopmail.com', NOW(), 1),
('olivier_fournier', 'Fournier', 'Olivier', '1991-10-18', 'olivier.fournier@yopmail.com', NOW(), 1),
('amelie_pires', 'Pires', 'Amélie', '1993-08-22', 'amelie.pires@yopmail.com', NOW(), 1),
('thomas_morand', 'Morand', 'Thomas', '1989-12-30', 'thomas.morand@yopmail.com', NOW(), 1),
('marie_dumont', 'Dumont', 'Marie', '1990-04-10', 'marie.dumont@yopmail.com', NOW(), 1),
('admin_girard', 'Girard', 'Admin', '1985-06-15', 'admin.girard@yopmail.com', NOW(), 2);

INSERT INTO photo_utilisateur values (default, CURRENT_TIMESTAMP, 'https://res.cloudinary.com/dpxgvv6x5/image/upload/v1738859341/xyb7v9tphiz3gqzptzcu.jpg', 1);

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


-- Insérer les données de test pour les cryptomonnaies
INSERT INTO cours_crypto (date_cours, montant, id_cryptomonnaie)
VALUES 
  (NOW(), 150.00, (SELECT id FROM cryptomonnaie WHERE symbole = 'LTC')),
  (NOW(), 0.50, (SELECT id FROM cryptomonnaie WHERE symbole = 'XRP')),
  (NOW(), 1.20, (SELECT id FROM cryptomonnaie WHERE symbole = 'ADA')),
  (NOW(), 250.00, (SELECT id FROM cryptomonnaie WHERE symbole = 'SOL')),
  (NOW(), 0.07, (SELECT id FROM cryptomonnaie WHERE symbole = 'DOGE')),
  (NOW(), 30.00, (SELECT id FROM cryptomonnaie WHERE symbole = 'DOT')),
  (NOW(), 1.50, (SELECT id FROM cryptomonnaie WHERE symbole = 'MATIC')),
  (NOW(), 350.00, (SELECT id FROM cryptomonnaie WHERE symbole = 'BCH')),
  (NOW(), 0.40, (SELECT id FROM cryptomonnaie WHERE symbole = 'XLM')),
  (NOW(), 50.00, (SELECT id FROM cryptomonnaie WHERE symbole = 'AVAX'));
