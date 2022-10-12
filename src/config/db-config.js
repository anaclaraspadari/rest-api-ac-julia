const { Sequelize } = require('sequelize');

const sequelizeCon = new Sequelize('postgres://iceanyhrjfpvgu:388a5e6717bfd4257930a464b6f5fa1c39a610b6a9c72e6a3bbe35dd9da9d177@ec2-34-239-81-70.compute-1.amazonaws.com:5432/d3qrfs90orrrrd', {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

module.exports = { sequelizeCon };

