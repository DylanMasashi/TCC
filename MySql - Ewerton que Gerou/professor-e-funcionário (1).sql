CREATE TABLE IF NOT EXISTS `Recomendacao` (
	`rcm_cod` int AUTO_INCREMENT NOT NULL UNIQUE,
	`curso_cod` int NOT NULL,
	`livro_cod` int NOT NULL,
	`usu_cod` int NOT NULL,
	`mod1` bit(1) NOT NULL,
	`mod2` bit(1) NOT NULL,
	`mod3` bit(1) NOT NULL,
	`mod4` bit(1) NOT NULL,
	PRIMARY KEY (`rcm_cod`)
);

CREATE TABLE IF NOT EXISTS `Livros` (
	`livro_cod` int AUTO_INCREMENT NOT NULL UNIQUE,
	`livro_pha_cod` varchar(5) NOT NULL,
	`livro_categ_cod` int NOT NULL,
	`livro_nome` varchar(50) NOT NULL,
	`livro_desc` text NOT NULL,
	`edt_cod` smallint NOT NULL,
	`livro_foto_capa` varchar(256) NOT NULL,
	PRIMARY KEY (`livro_cod`)
);

CREATE TABLE IF NOT EXISTS `Editora` (
	`edt_cod` smallint AUTO_INCREMENT NOT NULL UNIQUE,
	`edt_nome` varchar(50) NOT NULL,
	`edt_foto` varchar(256) NOT NULL,
	PRIMARY KEY (`edt_cod`)
);

ALTER TABLE `Recomendacao` ADD CONSTRAINT `Recomendacao_fk1` FOREIGN KEY (`curso_cod`) REFERENCES `Cursos`(`curso_cod`);

ALTER TABLE `Recomendacao` ADD CONSTRAINT `Recomendacao_fk2` FOREIGN KEY (`livro_cod`) REFERENCES `Livros`(`livro_cod`);

ALTER TABLE `Recomendacao` ADD CONSTRAINT `Recomendacao_fk3` FOREIGN KEY (`usu_cod`) REFERENCES `Usuarios`(`usu_cod`);

ALTER TABLE `Livros` ADD CONSTRAINT `Livros_fk5` FOREIGN KEY (`edt_cod`) REFERENCES `Editora`(`edt_cod`);
