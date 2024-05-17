CREATE TABLE IF NOT EXISTS `Usuarios` (
	`usu_cod` int AUTO_INCREMENT NOT NULL,
	`usu_RA` int NOT NULL,
	`usu_nome` varchar(50) NOT NULL,
	`usu_email` varchar(50) NOT NULL,
	`usu_senha` varchar(12) NOT NULL,
	`usu_tipo` tinyint NOT NULL,
	`usu_sexo` tinyint NOT NULL,
	`usu_foto` varchar(256),
	PRIMARY KEY (`usu_cod`)
);

CREATE TABLE IF NOT EXISTS `Cursos` (
	`curso_cod` smallint AUTO_INCREMENT NOT NULL UNIQUE,
	`curso_nome` varchar(50) NOT NULL,
	`curso_ativo` bit(1) NOT NULL,
	PRIMARY KEY (`curso_cod`)
);

CREATE TABLE IF NOT EXISTS `Emprestimos` (
	`emp_cod` int NOT NULL,
	`usu_cod` int NOT NULL,
	`exemp_cod` int NOT NULL,
	`data_emp` date NOT NULL,
	`data_devol` date NOT NULL,
	`devolvido` bit(1) NOT NULL,
	PRIMARY KEY (`emp_cod`)
);

CREATE TABLE IF NOT EXISTS `Exemplares` (
	`exem_cod` tinyint AUTO_INCREMENT NOT NULL,
	`tombo` int NOT NULL,
	`data_aquis` date NOT NULL,
	`data_saida` date,
	`livro_cod` int NOT NULL,
	PRIMARY KEY (`exem_cod`)
);

CREATE TABLE IF NOT EXISTS `Livros` (
	`livro_cod` int AUTO_INCREMENT NOT NULL UNIQUE,
	`livro_pha_cod` varchar(5) NOT NULL,
	`livro_categ_cod` int NOT NULL,
	`livro_nome` varchar(50) NOT NULL,
	`livro_desc` varchar(500) NOT NULL,
	`edt_cod` smallint NOT NULL,
	`livro_foto_capa` varchar(256) NOT NULL,
	PRIMARY KEY (`livro_cod`)
);

CREATE TABLE IF NOT EXISTS `Autores` (
	`autor_cod` smallint AUTO_INCREMENT NOT NULL UNIQUE,
	`autor_nome` varchar(50) NOT NULL,
	`autor_foto` varchar(256) NOT NULL,
	PRIMARY KEY (`autor_cod`)
);

CREATE TABLE IF NOT EXISTS `Generos` (
	`gen_cod` tinyint AUTO_INCREMENT NOT NULL,
	`gen_nome` varchar(20) NOT NULL,
	`gen_foto` varchar(256) NOT NULL,
	PRIMARY KEY (`gen_cod`)
);

CREATE TABLE IF NOT EXISTS `Usuarios_Cursos` (
	`uc_cod` int AUTO_INCREMENT NOT NULL,
	`usu_cod` int NOT NULL,
	`curso_cod` smallint NOT NULL,
	PRIMARY KEY (`uc_cod`)
);

CREATE TABLE IF NOT EXISTS `Livros_Autores` (
	`la_cod` int AUTO_INCREMENT NOT NULL,
	`autor_cod` smallint NOT NULL,
	`livro_cod` int NOT NULL,
	PRIMARY KEY (`la_cod`)
);

CREATE TABLE IF NOT EXISTS `Livros_Generos` (
	`lg_cod` int AUTO_INCREMENT NOT NULL,
	`gen_cod` tinyint NOT NULL,
	`livro_cod` int NOT NULL,
	PRIMARY KEY (`lg_cod`)
);

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


ALTER TABLE `Emprestimos` ADD CONSTRAINT `Emprestimos_fk1` FOREIGN KEY (`usu_cod`) REFERENCES `Usuarios`(`usu_cod`);

ALTER TABLE `Emprestimos` ADD CONSTRAINT `Emprestimos_fk2` FOREIGN KEY (`exemp_cod`) REFERENCES `Exemplares`(`exem_cod`);
ALTER TABLE `Exemplares` ADD CONSTRAINT `Exemplares_fk4` FOREIGN KEY (`livro_cod`) REFERENCES `Livros`(`livro_cod`);


ALTER TABLE `Generos` ADD CONSTRAINT `Generos_fk0` FOREIGN KEY (`gen_cod`) REFERENCES `Livros_Gêneros`(`gen_cod`);
ALTER TABLE `Usuarios_Cursos` ADD CONSTRAINT `Usuarios_Cursos_fk1` FOREIGN KEY (`usu_cod`) REFERENCES `Usuarios`(`usu_cod`);

ALTER TABLE `Usuarios_Cursos` ADD CONSTRAINT `Usuarios_Cursos_fk2` FOREIGN KEY (`curso_cod`) REFERENCES `Cursos`(`curso_cod`);
ALTER TABLE `Livros_Autores` ADD CONSTRAINT `Livros_Autores_fk1` FOREIGN KEY (`autor_cod`) REFERENCES `Autores`(`autor_cod`);

ALTER TABLE `Livros_Autores` ADD CONSTRAINT `Livros_Autores_fk2` FOREIGN KEY (`livro_cod`) REFERENCES `Livros`(`livro_cod`);
ALTER TABLE `Livros_Generos` ADD CONSTRAINT `Livros_Generos_fk1` FOREIGN KEY (`gen_cod`) REFERENCES `Generos`(`gen_cod`);

ALTER TABLE `Livros_Generos` ADD CONSTRAINT `Livros_Generos_fk2` FOREIGN KEY (`livro_cod`) REFERENCES `Livros`(`livro_cod`);

ALTER TABLE `Recomendacao` ADD CONSTRAINT `Recomendacao_fk1` FOREIGN KEY (`curso_cod`) REFERENCES `Cursos`(`curso_cod`);

ALTER TABLE `Recomendacao` ADD CONSTRAINT `Recomendacao_fk2` FOREIGN KEY (`livro_cod`) REFERENCES `Livros`(`livro_cod`);

ALTER TABLE `Recomendacao` ADD CONSTRAINT `Recomendacao_fk3` FOREIGN KEY (`usu_cod`) REFERENCES `Usuarios`(`usu_cod`);

ALTER TABLE `Livros` ADD CONSTRAINT `Livros_fk5` FOREIGN KEY (`edt_cod`) REFERENCES `Editora`(`edt_cod`);