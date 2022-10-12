// const AutorRepository = require('./repositorio-memory');
// const AutorRepository = require('./repositorio-sql');
const { Autor }=require('./model');
//const crypto = require('crypto');


class AutorController {

    constructor() {
        
    }

    async create(req, res) {
        console.log("ADD NOVO AUTOR");
        const autoresBody=req.body;
        const ex = {  
            //id: crypto.randomUUID(),
            // ...req.body
            // // autor: req.body.autor.toUpperCase()
            nome: autoresBody.nome
        };

        await Autor.create(ex);
        
        return res.status(200).json(ex);
    }

    async detail(req, res){
        try{
            const {id}=req.params;
            const autor=await Autor.findOne({
                where:{
                    id: id
                }
            })
            return res.status(200).json(autor);
        }catch(err){
            return res.status(400).json({err});
        }
    }

    async list(req, res) {
        try{
            const autores=await Autor.findAndCountAll();
            return res.status(200).json(autores);
        }catch(err){
            return res.status(400).json({err});
        }
    }

    async update(req, res){
        console.log("ATT NOVO LIVRO");
        const {nome}=req.body
        await Autor.update({nome}, {
            where: {
                id: req.params.id
            }
        }).then(updated=>{
            if(updated==1){
                res.status(200).json({msg: "Atualizado com sucesso"});
            }else{
                res.status(404).json({msg: "Falha ao atualizar"});
            }
        }).catch(err=>{
            res.status(500).json("Nao foi possivel concluir a operacao");
        })
    }

    async delete(req, res) {
        Autor.destroy({
            where: {
                id: req.params.id
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


module.exports = AutorController;