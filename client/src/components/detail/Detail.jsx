import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router-dom";
import { useEffect } from "react";
import { getDetail, getDetailApi , deleteGame} from "../../actions";
import Loading from "../loading/Loading";
import "./Detail.css";

export default function Detail(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  let detail = useSelector((state) => state.detail);
  let detailApi = useSelector((state) => state.detailApi);
  const history = useHistory()

  useEffect(() => {
    
    dispatch(getDetail(id));
    dispatch(getDetailApi(id));

    
  }, [id]);

  const handleDelete = () => {
    dispatch(deleteGame(id))
    alert("Game delete")
    history.push('/home')
  }

  console.log(detail)
  return (
    <div className="detailContainer">
      {detail.length < 1 ? 
      (<Loading />) 
      : (
          <div>
            <h1 className="detailTitle">{detail[0].name}</h1> 
            <img className="detailImage" src={detail[0].image} alt="portada" />

            <p className="detailDescription">{ detail[0].id < 1000000 ? detailApi.description_raw: detail[0].description}</p>
            <div className="detailGroup">
              <p> Release : <span>{detail[0].realease? detail[0].realease : detail[0].release}</span></p>
              <p> Rating : <span>{detail[0].rating}</span></p>
            </div>
            
            <p>{detail[0].id < 1000000 ? <div><h3>Visit the website</h3> <a className="detailLink" href={detailApi.website}><p>{detailApi.website}</p></a></div> : <button className="detailButton" onClick={handleDelete}>Delete Game</button>}</p>

          </div>
      )}
    </div>
  );
}
