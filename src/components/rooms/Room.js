import React, { useState, useEffect} from "react";
import kitchen from "../../images/kitchen.png"
import living from "../../images/living.png"
import dinner from "../../images/dinner.png"

function Room(props){

    const [ rooms, setRooms ] = useState([]);
    const [ actual, setActual ] = useState();

    useEffect(() => {
        fetch("https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json")
            .then(res => res.json()).then( data => {
                setRooms(data);
            });

        setActual(localStorage.getItem("space"))
    }, []);

    let content = (
        <div className="row d-flex justify-content-center align-items-center">
            {rooms.map((r) => {

                let imagen;

                if(r.name.startsWith("Kitchen")) {
                    imagen = kitchen;
                }
                else if (r.name.startsWith("Living")){
                    imagen = living;
                }
                else {
                    imagen = dinner
                }
                
                return (
                    <div className="card" style={{width: "10rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">{r.name}</h5>
                        </div>
                        <img className="card-img" src={imagen} alt="Card" />
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


export default Room;