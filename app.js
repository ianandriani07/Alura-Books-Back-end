const express = require("express");

const app = express();
app.use(express.json());

const rotaLivro = require('./rotas/livro')

const port = 8000;

app.use('/livros', rotaLivro);

app.listen(port, () => {
    console.log(`Escutando a porta ${port}`);
});

