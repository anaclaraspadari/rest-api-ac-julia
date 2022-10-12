const { Livros } = require('./model');
const Sequelize = require ('sequelize');

class LivrosRepository {
    constructor() {
    }

    async save(lv) {
        await Livros.create(lv);
    }

    async random() {
        const lv = await Livros.findOne({
            order: 
                Sequelize.literal('random()')
        })
        return lv;
    }

    async detail(id) {
        const lv = await Livros.findByPk(id)
        return lv;
    }

    async list(autor) {
        const listagem = await Livros.findAll({
            where: { 
                autor
            }
        })
        return listagem;
    }
}

module.exports = LivrosRepository;