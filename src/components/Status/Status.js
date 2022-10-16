import React, { Component } from "react";
// import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

export default class Status extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                {/* <input type="checkbox" checked data-toggle="toggle" data-on="Ready" data-off="Not Ready" data-onstyle="success" data-offstyle="danger"/> */}
                {/* <BootstrapSwitchButton checked={this.props.connected} width={100} disabled={true}/> */}
                <BootstrapSwitchButton onlabel={"Connected"} offlabel={"Disconnected"} onstyle="connected-status" offstyle="disconnected-status" style="toggle-status" checked={true} width={175} height={35} disabled={false}/> 
            </div>
        )
    }
}