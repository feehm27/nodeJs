const path = require('path')
const express = require('express');
const hbs = require('hbs');
const app = express();
const cotacoes = require('./util/cotacao');

//Recupera os caminhos dos diretorios do projeto
const publicDirectoryPath = path.join(__dirname, '../public'); 
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Seta as variaveis para redirecionamento
app.set('view engine', 'hbs'); // Permite o redirecionamento para views->index.hbs
app.set('views', viewsPath); //Permite o redirecionamento para templates
app.use(express.static(publicDirectoryPath)); 
hbs.registerPartials(partialsPath);

/* --------------------------------- ROTAS --------------------------------------- */

///////////////////// PAREI EM FETCH FRONTEND -> ASSISTIR O PROXIMO /////////////////////////////////////
app.get('', (req,res) => {
    res.render('index', {
        title: 'Bem vindo ao Rick & Morty',
        author: 'Rick Sanches'
    })
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Rick Sanches'
        
    })
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Ajuda',
        author: 'Rick Sanches'
    })
});

app.get('/cotacoes', (req,res) => {

    if(!req.query.ativo){
        return res.status(400).json({
            error: {
                 message: 'O ativo deve ser enviado como query parameter',
                 code: 404
            }
        })
    }
    const symbol = req.query.ativo.toUpperCase()

    cotacoes(symbol, (err, body) => {
        if(err){
            return res.status(err.code).json({error: {
                message: err.message,
                code: err.code
           }})
        }
        res.status(200).json(body)
    })
})

app.get('/help/*', (req,res) => { 
    res.render('404', {
        title: '404', 
        errorMessage: "Não existe página depois de /help",
        author: 'Rick Sanches'
    })
})

app.get('*', (req,res) => {
    res.render('404', { 
        title: '404', 
        errorMessage: "Página não encontrada",
        author: 'Rick Sanches'
    });
})

/* -------------------------------------------------------------------------------- */
//Listen para informar a porta que será utilizada (3000)
//Rodar o comando node src/app.js 
//Acessar no navegador -> localhost:3000
//Comando para rodar hbs -> nodemon src/app.js -e js,hbs

app.listen(3000, () => {
    console.log("Server is up on port 3000");
})

