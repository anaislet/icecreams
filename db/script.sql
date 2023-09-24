-- Pour changer d'utilisateur Linux : sudo su - postgres
-- Ouverture de psql : psql

-- Création d'un user postgres via terminal
CREATE USER icecreams WITH PASSWORD 'berthillon';

-- Création de la db via terminal
CREATE DATABASE icecreams OWNER icecreams;

-- Sortir de psql : \q
-- Changer de user Linux : exit
-- Retourner dans psql avec le bon user : psql -d icecreams -U icecreams -h localhost -p 5432

-- Création de la table icecreams
DROP TABLE IF EXISTS flavors;

CREATE TABLE flavors(
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    alcool BOOLEAN,
    kcal INT,
    matgr FLOAT,
    protein INT,
    glucide INT,
    gluten BOOLEAN,
    icecream BOOLEAN,
    sorbet BOOLEAN,
    category VARCHAR(50),
    color VARCHAR(7)
    );

ALTER TABLE IF EXISTS flavors OWNER to icecreams;

-- Création d'un parfum dans la table icecreams
INSERT INTO flavors VALUES (1, 'caramel');

--Pour visualiser les db : \l

DROP TABLE IF EXISTS compositions;
CREATE TABLE compositions(id SERIAL PRIMARY KEY NOT NULL, flavor1 INT, flavor2 INT, flavor3 INT, count INT);
ALTER TABLE IF EXISTS compositions OWNER to icecreams;
ALTER TABLE compositions ADD CONSTRAINT fk_compositions_flavors1 FOREIGN KEY (flavor1) REFERENCES flavors (id);
ALTER TABLE compositions ADD CONSTRAINT fk_compositions_flavors2 FOREIGN KEY (flavor2) REFERENCES flavors (id);
ALTER TABLE compositions ADD CONSTRAINT fk_compositions_flavors3 FOREIGN KEY (flavor3) REFERENCES flavors (id);
INSERT INTO compositions VALUES (DEFAULT, 1, 2, 7, 1);

-- Pour importer un fichier csv. On a été obligé de faire un \copy et de mettre un point en séparateur de nb décimal dans le fichier excel car i\copy ne permet de préciser le séparateur 
\copy flavors (name, id, alcool, kcal, matgr, protein, glucide, gluten, icecream, sorbet, category, color) FROM '/home/anaislet/Bureau/parfum_glace.csv' DELIMITER ',' CSV HEADER;
