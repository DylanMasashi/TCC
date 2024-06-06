// const db = require('../database/connection');

module.exports = {
    async listarGeneros(request, response) {
        try {
            // instruções SQL
            const sql = `SELECT 
                gen_cod, gen_nome, gen_foto;`;
            // executa instruções SQL e armazena o resultado na variável usuários
            const generos = await db.query(sql);
            // armazena em uma variável o número de registros retornados
            const nItens = generos[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de gêneros.',
                dados: generos[0],
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
    async cadastrarGeneros(request, response) {
        try {
            // parâmetros recebidos no corpo da requisição
            const { gen_nome, gen_foto} = request.body;
            // instrução SQL
            const sql = `INSERT INTO generos
                (gen_cod, gen_nome, gen_foto) 
                VALUES (?, ?, ?)`;
            // definição dos dados a serem inseridos em um array
            const values = [gen_cod, gen_nome, gen_foto];
            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values);
            // identificação do ID do registro inserido
            const gen_cod = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro do gênero efetuado com sucesso.',
                dados: gen_cod
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
    async editarGeneros(request, response) {
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { gen_nome, gen_foto } = request.body;
            // parâmetro recebido pela URL via params ex: /usuario/1
            const { gen_cod } = request.params;
            // instruções SQL
            const sql = `UPDATE generos SET gen_cod = ?, gen_nome = ?, 
                        gen_foto = ?
                        WHERE gen_cod = ?;`;
            // preparo do array com dados que serão atualizados
            const values = [gen_nome, gen_foto, gen_cod];
            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Gênero ${gen_cod} atualizado com sucesso!`,
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
    async apagarGeneros(request, response) {
        try {
            // parâmetro passado via url na chamada da api pelo front-end
            const { gen_cod } = request.params;
            // comando de exclusão
            const sql = `DELETE FROM generos WHERE gen_cod = ?`;
            // array com parâmetros da exclusão
            const values = [gen_cod];
            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Gênero ${gen_cod} excluído com sucesso`,
                dados: excluir[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }    
    }
}