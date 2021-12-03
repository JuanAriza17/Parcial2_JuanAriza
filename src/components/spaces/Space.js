import React, { useState, useEffect} from "react";
import casa from "../../images/casa.png"
import apartamento from "../../images/apartamento.png"

function Space(props){

    const [ spaces, setSpaces ] = useState([]);

    useEffect(() => {
        fetch("https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json")
            .then(res => res.json()).then( data => {
                setSpaces(data);
            });
    }, []);

    function changeSpace(actualSpace)
    {
        localStorage.setItem("space", actualSpace);
    }

    let content = (
        <div className="row d-flex justify-content-center align-items-center">
            {spaces.map((s) => {

                let imagen;

                if(s.name.startsWith("Casa")) {
                    imagen = casa;
                }
                else {
                    imagen = apartamento
                }
                
                return (
                    <div className="card" style={{width: "10rem"}} onClick={()=>{changeSpace(s.id)}}>
                        <img className="card-img-top" src={imagen} alt="Card" />
                        <div className="card-body">
                            <h5 className="card-title">{s.name}</h5>
                            <p className="card-text">{s.address}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return(
        <div>
            <h2>My spaces</h2>
            <div>{content}</div>
        </div>
    );
}


export default Space;