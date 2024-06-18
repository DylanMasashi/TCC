-- Tabela: Livros
CREATE TABLE Livros (
    liv_cod INT AUTO_INCREMENT PRIMARY KEY,
    livro_categ_cod INT,
    livro_nome VARCHAR(255)    
);

-- Tabela: Generos
CREATE TABLE Generos (
    gen_cod INT AUTO_INCREMENT PRIMARY KEY,
    gen_nome VARCHAR(255),
    gen_foto VARCHAR(255)
);

-- Tabela: LIVRO_GENERO
CREATE TABLE LIVRO_GENERO (
    lg_cod INT AUTO_INCREMENT PRIMARY KEY,
    liv_cod INT,
    gen_cod INT,
    FOREIGN KEY (liv_cod) REFERENCES Livros(liv_cod),
    FOREIGN KEY (gen_cod) REFERENCES Generos(gen_cod)
);

SELECT * FROM Livros
SELECT * FROM Generos
SELECT * FROM LIVRO_GENERO

	SELECT Liv.livro_nome AS Livro,
		   Gen.gen_nome   AS Genero
	  FROM LIVRO_GENERO AS Lge
INNER JOIN Generos 		AS Gen ON Lge.gen_cod   = Gen.gen_cod
INNER JOIN Livros  		AS Liv ON Lge.liv_cod = Liv.liv_cod

INSERT INTO Livros AS Liv (liv_cod, livro_nome) 

LEFT  JOIN
RIGHT JOIN



-- Inserts para a tabela Livros
INSERT INTO Livros (livro_categ_cod, livro_nome) VALUES
(1, 'Dom Quixote'),
(2, 'Harry Potter e a Pedra Filosofal'),
(1, 'Cem Anos de Solidão'),
(3, 'O Senhor dos Anéis: A Sociedade do Anel'),
(4, 'Orgulho e Preconceito'),
(2, 'As Crônicas de Nárnia: O Leão, a Feiticeira e o Guarda-Roupa'),
(3, 'O Hobbit'),
(4, 'Jane Eyre'),
(1, 'Moby Dick'),
(2, 'O Código Da Vinci');

-- Inserts para a tabela Generos
INSERT INTO Generos (gen_nome, gen_foto) VALUES
('Ficção', 'ficcao.jpg'),
('Fantasia', 'fantasia.jpg'),
('Romance', 'romance.jpg'),
('Clássico', 'classico.jpg'),
('Aventura', 'aventura.jpg');

-- Inserts para a tabela LIVRO_GENERO
INSERT INTO LIVRO_GENERO (liv_cod, gen_cod) VALUES
(1, 4),
(2, 2),
(3, 3),
(4, 1),
(5, 3),
(6, 2),
(7, 2),
(8, 3),
(9, 1),
(10, 4);


