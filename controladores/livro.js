const { getTodosLivros, getLivroPorId, insereLivro, modificaLivro, deletaLivro } = require("../servicos/livro");

function getLivros(req, res) {
    try {
        const livros = getTodosLivros();
        res.send(livros);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

function getLivro(req, res) {
    const id = req.params.id;
    try {
        const livro = getLivroPorId(id);
        res.send(livro);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

function postLivro(req, res) {
    try {
        const livroNovo = req.body;
        const id = req.body.id;
        const nome = req.body.nome;

        if(id === undefined || nome === undefined){
            res.status(400);
            res.send({"erro": "Você precisa inserir todos os campos para adicionar um novo livro"});
        }

        else{
            insereLivro(livroNovo);
            res.status(201);
            res.send("Livro inserido com sucesso");
        }

        
    }

    catch(error) {
        res.status(500);
        res.send(error.message);
    }
}

function patchLivro(req, res) {
    try {
        const id = req.params.id;
        const body = req.body;

        if(modificaLivro(body, id)){
            res.status(404);
            res.send({"erro": "Livro não encontrado"});
        }

        else{
            res.send("Item modificado com sucesso");
        }
    }

    catch(error) {
        res.status(500);
        res.send(error.message);
    }
}

function deleteLivro(req, res) {
    try {
        const id = req.params.id;

        if(deletaLivro(id)) {
            res.status(404);
            res.send({"erro": "Livro não encontrado"});
        }

        else{
            res.send("Item removido com sucesso!");
        }
    }

    catch(error) {
        res.status(500);
        res.send(error.message);
    }
}

module.exports = {
    getLivros,
    getLivro,
    postLivro,
    patchLivro,
    deleteLivro
}