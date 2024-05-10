// const db = require('../database/connection');

module.exports = {
    async listarRecomendacao(request, response) {
        try {
            // instruções SQL
            const sql = `SELECT 
                emp_cod, data_emp, data_devol, devolvido;`;
            // executa instruções SQL e armazena o resultado na variável usuários
            const recomendacao = await db.query(sql);
            // armazena em uma variável o número de registros retornados
            const nItens = recomendacao[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de recomendações.',
                dados: recomendacao[0],
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
    async cadastrarRecomendacao(request, response) {
        try {
            // parâmetros recebidos no corpo da requisição
            const { usu_cod, exemp_cod, data_emp, data_devol, devolvido} = request.body;
            // instrução SQL
            const sql = `INSERT INTO recomendacao
                (emp_cod, usu_cod, exemp_cod, data_emp, data_devol, devolvido) 
                VALUES (?, ?, ?, ?, ?, ?)`;
            // definição dos dados a serem inseridos em um array
            const values = [emp_cod, usu_cod, exemp_cod, data_emp, data_devol, devolvido];
            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values);
            // identificação do ID do registro inserido
            const emp_cod = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro da recomendação efetuada com sucesso.',
                dados: emp_cod
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
    async editarRecomendacao(request, response) {
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { usu_cod, exemp_cod, data_emp, data_devol, devolvido } = request.body;
            // parâmetro recebido pela URL via params ex: /usuario/1
            const { emp_cod } = request.params;
            // instruções SQL
            const sql = `UPDATE recomendacao SET emp_cod = ?, usu_cod = ?, 
                        exemp_cod = ?, data_emp = ?, data_devol = ?, devolvido = ?
                        WHERE emp_cod = ?;`;
            // preparo do array com dados que serão atualizados
            const values = [usu_cod, exemp_cod, emp_cod, data_emp, data_devol, devolvido, emp_cod];
            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Recomendação ${emp_cod} atualizada com sucesso!`,
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
    async apagarRecomendacao(request, response) {
        try {
            // parâmetro passado via url na chamada da api pelo front-end
            const { emp_cod } = request.params;
            // comando de exclusão
            const sql = `DELETE FROM recomendacao WHERE emp_cod = ?`;
            // array com parâmetros da exclusão
            const values = [emp_cod];
            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Recomendação ${emp_cod} excluída com sucesso`,
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