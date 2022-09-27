const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type: DataTypes.STRING(500),
      allowNull: false
    },
    release:{ 
      type: DataTypes.STRING,
      defaultValue: "12-12-12"
    },
    image:{ 
      type: DataTypes.STRING,
      defaultValue:"https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2021/12/salon-gamer-playstation-2554073.jpg?itok=KpSrZAhB"
    },
    rating:{
      type: DataTypes.FLOAT,
      defaultValue:5
    },
    platforms:{ 
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue:["Playstation"]
    },
    
    created:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true
    }
  });
};
