const fs = require('fs');

function getTodosLivros() {
    return JSON.parse(fs.readFileSync('livros.json'));
}

function getLivroPorId(id) {
    const livros = JSON.parse(fs.readFileSync('livros.json'));
    livroFiltrado = livros.filter( livro => livro.id === id )[0];

    if (livroFiltrado == undefined) {
        return {"erro": "Livro não encontrado"};
    }

    return livroFiltrado;
}

function insereLivro(livroNovo) {
    const livros = JSON.parse(fs.readFileSync('livros.json'));
    const novaListaDeLivros = [...livros, livroNovo];

    fs.writeFileSync('livros.json', JSON.stringify(novaListaDeLivros));
}

function modificaLivro(modificacoes, id) {
    let livrosAtuais = JSON.parse(fs.readFileSync('livros.json'));
    const indiceModificado = livrosAtuais.findIndex( livro => livro.id === id);
    const conteudoMudado = { ...livrosAtuais[indiceModificado], ...modificacoes };

    if(indiceModificado === -1){
        return true;
    }

    livrosAtuais[indiceModificado] = conteudoMudado;


    fs.writeFileSync('livros.json', JSON.stringify(livrosAtuais));
}

function deletaLivro(id) {
    const livros = JSON.parse(fs.readFileSync('livros.json'));
    const quantidadeOriginal = livros.length;
    const livrosAtualizados = livros.filter(livro => livro.id !== id);
    const quantidadeAtualizada = livrosAtualizados.length;
    
    if(quantidadeOriginal === quantidadeAtualizada){
        return true;
    }

    fs.writeFileSync('livros.json', JSON.stringify(livrosAtualizados));
}

module.exports = {
    getTodosLivros,
    getLivroPorId,
    insereLivro,
    modificaLivro,
    deletaLivro
}