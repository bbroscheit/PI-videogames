import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getGenres, newGame } from "../../actions";
import { Link, useHistory} from "react-router-dom";
import './CharacterCreate.css';

export default function CharacterCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.allGenre);
  
  const altPlatforms = useSelector((state) => state.altForGames);
  let platformsArr = [];
  let platformsArrFiltered=[];

  let platforms = altPlatforms.map(el => el.platforms);
  platforms.map((el) => {
    for (let i = 0; i < el.length; i++) {
      platformsArr.push(el[i]);
    }
    return platformsArr;
  });

  for( let i=0; i<platformsArr.length; i++){
    if(!platformsArrFiltered.includes(platformsArr[i])){
      platformsArrFiltered.push(platformsArr[i])
    }
  }

  const [input, setInput] = useState({
    name: "",
    description: "",
    release: "",
    rating: "",
    image:"https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2021/12/salon-gamer-playstation-2554073.jpg?itok=KpSrZAhB",
    platforms: [],
    genres: [],
  });
  
  const [error, setError] = useState("");
  const [button,setButton] = useState({
    complete:false
  });

  

  function validate(input){
    let errors = {};
    

    if(!input.name){
      errors.name = "El campo no debe quedar vacio"
    }
    if(!input.description){
      errors.description = "El campo no debe quedar vacio"
    } else if (input.description.length > 500){
      errors.description = "solo se admiten 500 caracteres"
    }
    if(!input.release){
      errors.release = "El campo no debe quedar vacio"
    }
    if(!input.rating){
      errors.rating = "El campo no debe quedar vacio"
    }else if(input.rating < 0 || input.rating > 5){
      errors.rating = "el valor debe estar en 0 y 5"
    }
    if(input.platforms.length < 1){
      errors.platforms = "El campo no debe quedar vacio"
    }
    if(input.genres.length < 1){
      errors.genres = "Debes elegir al menos uno"
    }
    if(errors.name || errors.description || errors.release || errors.rating || errors.platforms || errors.genres){
      setButton({
        complete:false
      })
    }else{
      setButton({
        complete:true
      })
    }
    
    return errors
  }

  useEffect(() => {
    dispatch(getGenres());

  }, []);

  function handleDelete(e) {
    let nombre = e.target.innerText;
    setInput({
      ...input,
      platforms:input.platforms.filter(e => e !== nombre)
    })
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setError(validate({
      ...input,
      [e.target.name]: e.target.value,
    }))
  }

  function handleCheck(e){
    if(e.target.checked){
      setInput({
        ...input,
        genres:[...input.genres,e.target.value]
      })
    }

    setError(validate({
      ...input,
      genres:[...input.genres,e.target.value]
      
    }))
  }

  function handleSelect(e){
    setInput({
      ...input,
      platforms:[...input.platforms,e.target.value]
    })

    setError(validate({
      ...input,
      platforms:[...input.platforms,e.target.value]
      
    }))
  }

  function handleSubmit(e){
    e.preventDefault(e);
   
    dispatch(newGame(input));
    alert("personaje creado");
    setInput({
      name: "",
      description: "",
      release: "",
      rating: "",
      image:"",
      platforms: [],
      genres: [],
    });
    history.push("/home")
  }

  function handleReset(e){
    e.preventDefault(e);
    setInput({
      name: "",
      description: "",
      release: "",
      rating: "",
      image:"",
      platforms: [],
      genres: [],
    });
    
    setError("")
    setButton({
      complete:false
    })
  }
  

  return (
    <div className="formContainer">
      
      <h1 className="formTitle">Create your own Game</h1>
      <form onSubmit={e => handleSubmit(e)} className="form">
        <div className="formLabelContainer">
          <div className="formData">
            <label>Nombre:</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            <p className={error.name?"danger":"normal"}>{error.name}</p>
            
            <label>Descripcion:</label>
            <textarea
              type="text"
              value={input.description}
              name="description"
              onChange={(e) => handleChange(e)}
            />
            <p className={error.description?"danger":"normal"}>{error.description}</p>
            <label>Lanzamiento (dd/mm/yyyy):</label>
            <input
              type="text"
              value={input.release}
              name="release"
              onChange={(e) => handleChange(e)}
            />
            <p className={error.release?"danger":"normal"}>{error.release}</p>
            <label>Valoracion:</label>
            <input
              type="number"
              value={input.rating}
              name="rating"
              onChange={(e) => handleChange(e)}
            />
            <p className={error.rating?"danger":"normal"}>{error.rating}</p>
            <label>URL Image:</label>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </div>
        
          <div className="formSelects">
            
              <label>Plataformas:</label>
              <select name={input.platforms} onChange={e => handleSelect(e)}>
            {
              platformsArrFiltered.map(el => (
                <option value={el}>{el}</option>
              ))
            }
            </select>
          <p className={error.platforms?"danger":"normal"}>{error.platforms}</p>
          <div className="formPlatforms">{input.platforms? input.platforms.map(el => <div className="inputPlatform"><p onClick={e => handleDelete(e)}>{el}</p></div>):""}</div>
          <div className="formCheckbox">
            <label>Genres:</label>
            <p className={error.genres?"dangerGenres":"normal"}>{error.genres}</p>
            <div className="formChecks">
            {genres.map((el) => (
              <label>
                <input type="checkbox" value={el.name} name={input.genres} onChange={e => handleCheck(e)} />
                {el.name}
              </label>
            ))}
            </div>
          </div>
          </div>
        </div>
        <div className="formButton">
          <button><Link to="/" className="formBackButton">Back Home</Link></button>
          {button.complete === false ? <button disabled="disabled">Create</button> : <button type="submit" >Create</button>}
          <button type="submit" onClick={e => handleReset(e)}>Reset</button>
        </div>
      </form>
    </div>
  );
}
