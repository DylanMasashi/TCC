// const db = require('../database/connection');

module.exports = {
    async listarLivros(request, response) {
        try {
            // instruções SQL
            const sql = `SELECT 
                livro_cod, livro_pha_cod, livro_categ_cod, livro_nome, livro_desc, edt_cod, livro_foto_capa;`;
            // executa instruções SQL e armazena o resultado na variável usuários
            const livros = await db.query(sql);
            // armazena em uma variável o número de registros retornados
            const nItens = livros[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de livros.',
                dados: livros[0],
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
    async cadastrarLivros(request, response) {
        try {
            // parâmetros recebidos no corpo da requisição
            const { livro_pha_cod, livro_categ_cod, livro_nome, livro_desc, edt_cod, livro_foto_capa} = request.body;
            // instrução SQL
            const sql = `INSERT INTO livros
                (livro_cod, livro_pha_cod, livro_categ_cod, livro_nome, livro_desc, edt_cod, livro_foto_capa) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;
            // definição dos dados a serem inseridos em um array
            const values = [livro_pha_cod, livro_categ_cod, livro_nome, livro_desc, edt_cod, livro_foto_capa];
            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values);
            // identificação do ID do registro inserido
            const livro_cod = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de livros efetuado com sucesso.',
                dados: livro_cod
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
    async editarLivros(request, response) {
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { livro_pha_cod, livro_categ_cod, livro_nome, livro_desc, edt_cod, livro_foto_capa } = request.body;
            // parâmetro recebido pela URL via params ex: /usuario/1
            const { livro_cod } = request.params;
            // instruções SQL
            const sql = `UPDATE livros SET livro_pha_cod = ?, livro_categ_cod = ?, livro_nome = ?, 
                        livro_desc, edt_cod, livro_foto_capa
                        WHERE livro_cod = ?;`;
            // preparo do array com dados que serão atualizados
            const values = [livro_pha_cod, livro_categ_cod, livro_nome, livro_desc, edt_cod, livro_foto_capa, livro_cod];
            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Livro ${livro_cod} atualizado com sucesso!`,
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
    async apagarLivros(request, response) {
        try {
            // parâmetro passado via url na chamada da api pelo front-end
            const { livro_cod } = request.params;
            // comando de exclusão
            const sql = `DELETE FROM livros WHERE livro_cod = ?`;
            // array com parâmetros da exclusão
            const values = [livro_cod];
            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Livro ${livro_cod} excluído com sucesso`,
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