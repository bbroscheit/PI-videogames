const { DataTypes} = require("sequelize");

module.exports = (sequelize) =>{
    sequelize.define('generos',{
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    
    );
};