import React, { useState, useEffect} from "react";
import kitchen from "../../assets/kitchen.png"
import living from "../../assets/living.png"
import dinner from "../../assets/dinner.png"
import Device from '../devices/Device.js';
import PieChart from '../piechart/PieChart.js';
import "./room.css";
import { FormattedMessage } from "react-intl";

function Room(props){

    const [ rooms, setRooms ] = useState([]);
    const [ devices, setDevices ] = useState([]);

    useEffect(() => {
        if(!navigator.onLine){
            if(localStorage.getItem("rooms") === null){
                setRooms("Loading...");
            }
            else{
                setRooms(JSON.parse(localStorage.getItem("rooms")));
            }
        }
        else{
            fetch("https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json")
            .then(res => res.json()).then( data => {
                setRooms(data);
                localStorage.setItem("rooms", JSON.stringify(data));
            });
        }

        setDevices([]);
    }, [props.actual]);

    function changeDevices(actualDevices)
    {
        setDevices(actualDevices);
    }

    let content = (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className={ devices.length ? "col-6 d-flex justify-content-center" : ""}>
                    <div className="row d-flex justify-content-center">
                        {rooms.filter(x => x.homeId === props.actual).map((r, i) => {
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
                                <div className="col d-flex justify-content-center"  key={i}>
                                    <div className="card mb-3 cartasRoom" onClick={()=>changeDevices(r.devices)}>
                                        <div className="card-body d-flex justify-content-center">
                                            <h5 className="card-title"><FormattedMessage id={r.name} /></h5>
                                        </div>
                                        <img className="card-img" src={imagen} alt="Card" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={ devices.length ? "col-6" : ""}>
                    {devices.length ? <Device actual = {devices} /> : null}
                </div>
            </div>
        </div>
        
    );

    return(
        <div>
            <h2 className="mb-3"><FormattedMessage id="title2" /></h2>
            <div>{content}</div>
            <h2 className="mb-3"><FormattedMessage id="title3"/></h2>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <h5><FormattedMessage id="chart" /></h5>
                </div>
                <div className="row d-flex justify-content-center">
                    <PieChart  data = {rooms.filter(x => x.homeId === props.actual)}/>
                </div>
            </div>
        </div>
    );
}


export default Room;