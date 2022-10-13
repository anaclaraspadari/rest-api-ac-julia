const { Usuario } = require('./model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsuariosController {

    constructor() {
        
    }

    async create(req, res) {
        // // INPUT
        // const { email, senha, nome } = req.body;

        // // PROCESSAMENTO
        // const user = await Usuario.create({
        //     email, senha, nome
        // });

        // // RESPOSTA
        // return res.status(201).json(user);

        const userBody=req.body;
        const senha=bcrypt.hashSync(userBody.senha,10);

        const user={
            email: userBody.email,
            nome: userBody.nome,
            senha
        }

        await Usuario.create(user);

        return res.status(201).json(user);

    }

    async auth(req, res) {
        const { email, senha } = req.body;

        const user = await Usuario.findOne({
            where: {
                email
            }
        });

        const verifica=bcrypt.compareSync(senha, user.senha);

        if (!user) {
            return res.status(400).json({ msg: "USER AND PASS NOT MATCH"});
        }
            if(verifica){
                const meuJwt = jwt.sign(user.dataValues, 'SECRET NAO PODERIA ESTAR HARDCODED')
                return res.json(meuJwt);
            }else{
                return res.status(400).json({ msg: "USER AND PASS NOT MATCH" });
            }
        
        /*console.log(user);
        const meuJwt = jwt.sign(user.dataValues, 'SECRET NAO PODERIA ESTAR HARDCODED')
        return res.json(meuJwt);*/
    }

    async list(req, res) {
        const users = await Usuario.findAndCountAll();
        res.json(users);
    }

    async profile(req, res) {
        res.json({ user: req.user});
    }
}


module.exports = UsuariosController;