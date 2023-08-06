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
DROP TABLE IF EXISTS public.flavors;

CREATE TABLE flavors(id INT PRIMARY KEY NOT NULL, name VARCHAR(50));

ALTER TABLE IF EXISTS public.flavors OWNER to icecreams;

-- Création d'un parfum dans la table icecreams
INSERT INTO flavors VALUES (1, 'caramel');

--Pour visualiser les db : \l