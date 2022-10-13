const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');
const { Usuario }=require('../usuarios/model');

class Autor extends Model {}

Autor.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: DataTypes.STRING,
}, { 
    sequelize: sequelizeCon, 
    schema: 'public',
    modelName: 'autores',
    createdAt: false,
    updatedAt: false
});

/*Usuario.hasMany(Autor, {onDelete: 'CASCADE'});
Autor.belongsTo(Usuario);*/

//sequelizeCon.sync({ force: true });

module.exports = { Autor };