import React, { useState, useEffect} from "react";
import casa from "../../assets/casa.png"
import apartamento from "../../assets/apartamento.png"
import Room from '../rooms/Room.js';
import "./space.css";
import { FormattedMessage } from "react-intl";


function Space(props){

    const [ spaces, setSpaces ] = useState([]);
    const [ actual, setActual ] = useState();

    useEffect(() => {
        if(!navigator.onLine){
            if(localStorage.getItem("spaces") === null) {
                setSpaces("Loading...");
            }
            else{
                setSpaces(JSON.parse(localStorage.getItem("spaces")));
            }
        }
        else{
            fetch("https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json")
            .then(res => res.json()).then( data => {
                setSpaces(data);
                localStorage.setItem("spaces", JSON.stringify(data));
            });
        }
    }, []);

    function changeSpace(actualSpace)
    {
        setActual(actualSpace);
    }
    let content = (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="row d-flex justify-content-center">
                    {spaces.map((s, i) => {

                        let imagen;
                        let id;

                        if(s.name.startsWith("Casa")) {
                            imagen = casa;
                            id = "house";
                        }
                        else {
                            imagen = apartamento
                            id = "apartment";
                        }
                        
                        return (
                            <div className="col d-flex justify-content-center" key = {i}>
                                <div className="card mb-3 cartasEspacio" onClick={()=>{changeSpace(s.id)}} >
                                    <img className="card-img-top" src={imagen} alt="Card" />
                                    <div className="card-body ">
                                        <h5 className="card-title">
                                            <FormattedMessage
                                                id={id}
                                                values={{
                                                    place: `${s.name.split(" ")[1]}`
                                                }}
                                            />
                                            </h5>
                                        <p className="card-text">
                                                {s.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    return(
        <div>
            <div>
                <h2 className="mb-3"><FormattedMessage id="title1" /></h2>
                <div>{content}</div>
            </div> 
            <div>
                {actual != null ? <Room actual = {actual}/> :null }
            </div>
        </div>
    );
}


export default Space;