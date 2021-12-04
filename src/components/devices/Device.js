import React from "react";
import { FormattedMessage } from "react-intl";

function Device(props){

    return(
        <div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col"><FormattedMessage id="device" /></th>
                    <th scope="col"><FormattedMessage id="value" /></th>
                    </tr>
                </thead>
                <tbody>
                    {props.actual.map((d, i) => {

                        return (
                            <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{d.id ? d.id : "N/A"}</td>
                            <td><FormattedMessage id={d.name} /></td>
                            <td>{ isNaN(d.desired.value.toString()) ? <FormattedMessage id={d.desired.value.toString()} />: d.desired.value}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}


export default Device;