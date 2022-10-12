// const LivrosRepository = require('./repositorio-memory');
//const LivrosRepository = require('./repositorio-sql');
//const crypto = require('crypto');
const { Livros, livro_genero } = require('./model');
const { Genero }=require('../generos/model');
const { Autor }=require('../autores/model');

class LivrosController {

    constructor() {
    }

    async create(req, res) {
        console.log("ADD NOVO LIVRO");
        const {nome, sinopse, lancamento, autoreId}=req.body

        const autor=await Autor.findByPk(autoreId)
        if(!autor){
            return res.status(400).json({msg: "Autor inexistente"}); 
        }

        const books=await Livros.create({nome, sinopse, lancamento, autoreId});
        
        return res.json({
            books
        });
    }

    async insertLivroGenero(req, res){
        console.log("ADD GENEROS NOS LIVROS")
        const {id}=req.params
        const genBody=req.body
        const ex={
            livroId: id,
            generoIdGenero: genBody.generoIdGenero
        };
        await livro_genero.create(ex)
        return res.json({
            ex
        });
    }

    async detail(req, res){
        try{
            const {id}=req.params;
            const livro=await Livros.findOne({
                where:{
                    id: id
                }, 
                include:[{
                    model: Genero
                }]
            })
            return res.status(200).json(livro);
        }catch(err){
            return res.status(400).json({err});
        }
    }

    async list(req, res) {
        try{
            const livros=await Livros.findAndCountAll(
                {
                    include:[{
                        model: Genero
                    }]
                }
            );
            res.status(200).json(livros);
        }catch(err){
            return res.status(400).json({err});
        }
    }

    async update(req, res){
        console.log("ATT NOVO LIVRO");
        const {nome, sinopse, lancamento, autoreId}=req.body
        await Livros.update({nome, sinopse, lancamento, autoreId}, {
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

    async delete(req, res){
        Livros.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(deleted){
            if(deleted===1){
                res.status(200).json({msg: "Deletado"});
            }else{
                res.status(404).json({msg: "Falha ao deletar"});
            }
        }).catch(err=>{
            res.status(500).json("Nao foi possivel concluir a operacao");
        })
    }
    
    async deleteLivroGenero(req, res){
        livro_genero.destroy({
            where:{
                livroId: req.params.id,
                generoIdGenero: req.params.generoIdGenero
            }
        }).then(function(deleted){
            if(deleted===1){
                res.status(200).json({msg: "Genero Deletado"});
            }else{
                res.status(404).json({ msg: "Falha ao deletar" });
            }
        }).catch(err => {
            res.status(500).json("Nao foi possivel concluir a operacao");
        })
    }

}


module.exports = LivrosController;