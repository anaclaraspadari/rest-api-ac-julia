const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');
const { Livros } = require('../livros/model');
const { Usuario } = require('./model');

class Resposta extends Model {}
    
Resposta.init({
    id_livro: DataTypes.STRING,
    alternativa: DataTypes.STRING
}, { 
    sequelize: sequelizeCon, 
    schema: 'b3',
    modelName: 'resposta'
});

Resposta.belongsTo(Usuario);
Resposta.belongsTo(Livros, {
    foreignKey: 'id_livro'
});

Usuario.hasMany(Resposta);
Livros.hasMany(Resposta, 
    {
        foreignKey: 'id_livro'
    });

sequelizeCon.sync({ force: sync });

module.exports = { Resposta };