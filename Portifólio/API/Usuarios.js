const db = require('../database/connection');

module.exports = {
    async listarUsuarios(request, response) {
        try {
            // instruções SQL
            const sql = `SELECT 
                usu_RA, usu_nome, usu_email, usu_tipo, 
                usu_foto, usu_ativo = 1 AS usu_ativo  
                FROM usuarios 
                WHERE usu_ativo = 1;`;
            // executa instruções SQL e armazena o resultado na variável usuários
            const usuarios = await db.query(sql);
            // armazena em uma variável o número de registros retornados
            const nItens = usuarios[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de usuários.',
                dados: usuarios[0],
                nItens
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async cadastrarUsuarios(request, response) {
        try {
            // parâmetros recebidos no corpo da requisição
            const { usu_nome, usu_email, usu_senha, usu_tipo, usu_sexo, usu_ativo } = request.body;
            // instrução SQL
            const sql = `INSERT INTO usuarios 
                (usu_RA, usu_nome, usu_email, usu_senha, usu_tipo, usu_sexo, usu_ativo) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;
            // definição dos dados a serem inseridos em um array
            const values = [usu_RA, usu_nome, usu_email, usu_senha, usu_tipo, usu_sexo, usu_ativo];
            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values);
            // identificação do ID do registro inserido
            const usu_cod = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de usuário efetuado com sucesso.',
                dados: usu_cod
                //mensSql: execSql
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async editarUsuarios(request, response) {
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { usu_nome, usu_email, usu_senha, usu_tipo, usu_sexo, usu_ativo } = request.body;
            // parâmetro recebido pela URL via params ex: /usuario/1
            const { usu_cod } = request.params;
            // instruções SQL
            const sql = `UPDATE usuarios SET usu_RA = ?, usu_nome = ?, 
                        usu_email = ?, usu_senha = ?, usu_tipo = ?, 
                        usu_sexo = ?, usu_ativo = ? 
                        WHERE usu_cod = ?;`;
            // preparo do array com dados que serão atualizados
            const values = [usu_nome, usu_email, usu_senha, usu_tipo, usu_sexo, usu_ativo, usu_cod];
            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${usu_cod} atualizado com sucesso!`,
                dados: atualizaDados[0].affectedRows
                // mensSql: atualizaDados
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async login(request, response) {
        try {

            const { usu_email, usu_senha } = request.body;

            const sql = `SELECT usu_cod, usu_nome, usu_tipo FROM usuarios 
                WHERE usu_email = ? AND usu_senha = ? AND usu_ativo = 1;`;

            const values = [usu_email, usu_senha];

            const usuarios = await db.query(sql, values);
            const nItens = usuarios[0].length; 

            if (nItens < 1) {
                return response.status(403).json({
                    sucesso: false,
                    mensagem: 'Login e/ou senha inválido.',
                    dados: null,
                });
            }
            // fazendo login
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Login efetuado com sucesso',
                dados: usuarios[0]
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
}

