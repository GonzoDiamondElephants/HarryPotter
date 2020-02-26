DROP TABLE IF EXISTS houses;

CREATE TABLE houses
(
  id SERIAL PRIMARY KEY,
  magicNumber INT,
  house VARCHAR(25)
);

INSERT INTO houses
  (magicNumber, house)
VALUES
  (7, 'Chucklefish');
