DROP DATABASE smartcity;

CREATE DATABASE smartcity;
 
USE smartcity;

CREATE TABLE responsaveis(
	id_res INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200)
);

CREATE TABLE locais(
	id_loc INT PRIMARY KEY AUTO_INCREMENT,
	local VARCHAR(200)
);

CREATE TABLE ambientes(
	id_amb INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(300),
    local INT,
    responsavel INT,
    FOREIGN KEY (local) REFERENCES locais(id_loc),
    FOREIGN KEY (responsavel) REFERENCES responsaveis(id_res)
);

CREATE TABLE microcontroladores(
	id_mic INT PRIMARY KEY AUTO_INCREMENT,
    modelo VARCHAR(50),
    mac_address VARCHAR(50),
    latitude FLOAT,
    longitude FLOAT,
    status BOOLEAN,
    ambiente INT,
    FOREIGN KEY (ambiente) REFERENCES ambientes(id_amb)
);

CREATE TABLE sensores(
	id_sen INT PRIMARY KEY AUTO_INCREMENT,
    sensor VARCHAR(50),
	unidade_med VARCHAR(5),
    status BOOLEAN,
    mic INT,
    FOREIGN KEY (mic) REFERENCES microcontroladores(id_mic)
);

CREATE TABLE historicos(
	id_his INT PRIMARY KEY AUTO_INCREMENT,
    valor FLOAT,
    timestamp DATETIME,
    sensor INT,
    FOREIGN KEY (sensor) references sensores(id_sen)
);

CREATE TABLE usuarios(
	id_usu INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200),
    telefone VARCHAR(30),
    tipo VARCHAR(20)
);