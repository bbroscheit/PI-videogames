const videogame = require('../models/Videogame');
const gender = require('../models/Gender');

const getApi = async() =>{
    const apiUrl = await axios(`https://api.rawg.io/api/games?key=${APIKEY}`);
    
    const apiInfo = await apiUrl.data.results.map( el => {
        return{
            id: el.id,
            name: el.name,
            description: "false",
            realease: el.released,
            rating: el.rating,
            platforms: el.platforms.map(el => el.platform.name)

        }
    })
    return apiInfo;
}

const getDb = async() =>{
    return await videogame.findAll({
        include:{
            model: gender,
            attributes:["name"],
            through:{
                attributes:[],
            }
        }
    })
}

export const getAllData = async() => {
    const apiInfo = await getApi();
    const dbInfo = await getDb();
    const allInfo = apiInfo.concat(dbInfo);

    return allInfo;
}