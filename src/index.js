/*
METHODS HTTP
    GET    - BUSCAR ALGUMA COISA
    POST   - ENVIAR DADOS PARA O SV
    PUT    - ATUALIZAR UM REGISTRO INTEIRO
    PATCH  - ATUALIZAR PARTE DE UM DADO
    DELETE - AUTOEXPLICATIVO

STATUS:
    200 - FOI TUDO BEM
    201 - CREATED - SIGINIFICA QUE CRIEI ALGUMA COISA MAS NAO PRECISO TE RETORNAR NADA
    204 - NO CONTENT

    400 - ERRO - BAD REQUEST
    401 - UNAUTHORIZED - NAO AUTORIZADO - NAO PODE FAZER ISSO (TOKEN EXPIRADO)
    403 - FORBIDDEN - NAO PODE MESMO
    404 - NOT FOUND - NAO ENCONTRADO
    409 - CONFLITO 

    500 - ERRO INTERNO NO SERVIDOR

*/

const express = require('express');
const app = express();


// INCLUI UM MIDDLEWARE PARA FAZER UM PARSER
// DAS REQUISICOES COM JSON NO SEU BODY
app.use(express.json());

usuarios = [];

app.get('/', (req, res) => {
    return res.json({
        system: {
            nome: "AnaClara-Julia",
            version: '0.0.1-SNAPSHOT'
        },
        //usuarios
    });
  
});

// app.post('/usuarios', (req, res) => {
//     console.log("No server...");
//     console.log({ body: req.body })
//     const newUser = {
//         timestamp: new Date(),
//         ...req.body, // DESESTRUTURAÇÃO - CONSISTE EM DESMONTAR O MEU OBJ
//     };
//     usuarios.push(newUser);
//     return res.json(newUser)
// });

// app.put('/usuarios/:name/livros', (req, res) => {
//     const { name } = req.params;    // busca o parametro name da URL
//     const user = usuarios.find(u => u.name == name);
//     console.log({
//         msg: "achei",
//         quem: user
//     });
    
//     const { livros } = req.body;
//     user.livros = livros;

//     return res.json(user);
// });

// app.delete('/usuarios/:name', (req, res) => {
//     const { name } = req.params;
//     usuarios = usuarios.filter(u => u.name !== name);
//     return res.status(201);
// })



const livrosRouter = require('./livros/routes');
app.use('/livros', livrosRouter);

const usuariosRouter = require('./usuarios/routes');
app.use('/usuarios', usuariosRouter);

const generosRouter = require('./generos/routes');
app.use('/generos', generosRouter);

const autoresRouter = require('./autores/routes');
app.use('/autores', autoresRouter);

app.listen(3000, () => console.log("Listening at 3000"));