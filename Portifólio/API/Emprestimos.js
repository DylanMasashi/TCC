// const db = require('../database/connection');

module.exports = {
    async listarEmprestimos(request, response) {
        try {
            // instruções SQL
            const sql = `SELECT 
                emp_cod, data_emp, data_devol, devolvido;`;
            // executa instruções SQL e armazena o resultado na variável usuários
            const emprestimos = await db.query(sql);
            // armazena em uma variável o número de registros retornados
            const nItens = emprestimos[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de emprestimos.',
                dados: emprestimos[0],
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
    async cadastrarEmprestimos(request, response) {
        try {
            // parâmetros recebidos no corpo da requisição
            const { autor_nome, autor_foto} = request.body;
            // instrução SQL
            const sql = `INSERT INTO emprestimos
                (autor_cod, autor_nome, autor_foto) 
                VALUES (?, ?, ?)`;
            // definição dos dados a serem inseridos em um array
            const values = [autor_cod, autor_nome, autor_foto];
            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values);
            // identificação do ID do registro inserido
            const autor_cod = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de emprestimos efetuado com sucesso.',
                dados: autor_cod
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
    async editarEmprestimos(request, response) {
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { autor_nome, autor_foto } = request.body;
            // parâmetro recebido pela URL via params ex: /usuario/1
            const { autor_cod } = request.params;
            // instruções SQL
            const sql = `UPDATE emprestimos SET autor_cod = ?, autor_nome = ?, 
                        autor_foto = ?
                        WHERE autor_cod = ?;`;
            // preparo do array com dados que serão atualizados
            const values = [autor_nome, autor_foto, autor_cod];
            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Autor ${autor_cod} atualizado com sucesso!`,
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
    async apagarEmprestimos(request, response) {
        try {
            // parâmetro passado via url na chamada da api pelo front-end
            const { autor_cod } = request.params;
            // comando de exclusão
            const sql = `DELETE FROM emprestimos WHERE autor_cod = ?`;
            // array com parâmetros da exclusão
            const values = [autor_cod];
            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `emprestimos ${autor_cod} excluído com sucesso`,
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