// const GeneroRepository = require('./repositorio-memory');
// const GeneroRepository = require('./repositorio-sql');
const { Genero }=require('./model');
//const crypto = require('crypto');


class GeneroController {

    constructor() {
        
    }

    async create(req, res) {
        console.log("ADD NOVO GENERO");
        const generosBody=req.body;
        const ex = {  
            //id_genero: crypto.randomUUID(),
            // ...req.body
            // // autor: req.body.autor.toUpperCase()
            nome: generosBody.nome
        };

        await Genero.create(ex);
        
        return res.json({
            ex
        });
    }

    async detail(req, res){
        try{
            const {id}=req.params;
            const genero=await Genero.findOne({
                where:{
                    id_genero: id
                }
            })
            return res.status(200).json(genero);
        }catch(err){
            return res.status(400).json({err});
        }
    }
    
    async list(req, res) {
        try{
            const generos=await Genero.findAndCountAll();
            res.status(200).json(generos);
        }catch(err){
            return res.status(400).json({err});
        }
    }

    async update(req, res){
        try{
            const {id}=req.params;
            const {nome}=req.body;
            await Genero.update({nome}, {where: {
                id_genero: id
            }});
            return res.status(200).json({msg: "Atualizado"});
        }catch(err){
            return res.status(400).json({err});
        }
    }

    async delete(req, res) {
        Genero.destroy({
            where: {
                id_genero: req.params.id
            }
        }).then(function (deleted) {
            if (deleted === 1) {
                res.status(200).json({ msg: "Deletado" });
            } else {
                res.status(404).json({ msg: "Falha ao deletar" });
            }
        }).catch(err => {
            res.status(500).json("Nao foi possivel concluir a operacao");
        })
    }
}


module.exports = GeneroController;