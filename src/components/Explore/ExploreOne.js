import React, { Component } from 'react';
import axios from 'axios';
import {allNftData, ethNftData, solNftData, eluNftData, avaNftData, aptNftData} from "../Data/Data"

const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json/explore";

class ExploreTwo extends Component {
    state = {
        data: {},
        exploreData: []
    }
    componentDidMount(){
        console.log("CDM")
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    exploreData: allNftData
                })
                // console.log(this.state.data)
            })
        .catch(err => console.log(err))
    }

    handleChange = (event) => {
        console.log("change the filtered display")
        console.log("option: ", event.target.value)
        // console.log()
        //Add filter logic
        if (event.target.value == "All") {
            this.setState({
                exploreData: allNftData
            })
        } else if (event.target.value == "Ethereum") {
            this.setState({
                exploreData: ethNftData
            })
        } else if (event.target.value == "Solana") {
            this.setState({
                exploreData: solNftData
            })
        } else if (event.target.value == "Eluvio") {
            this.setState({
                exploreData: eluNftData
            })
        } else if (event.target.value == "Avalanche") {
            this.setState({
                exploreData: avaNftData
            })
        } else if (event.target.value == "Aptos") {
            this.setState({
                exploreData: aptNftData
            })
        }
    }

    render() {
        return (
            <section className="explore-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro d-flex justify-content-between align-items-end m-0">
                                <div className="intro-content">
                                    <span>{this.state.data.preHeading}</span>
                                    <h3 className="mt-3 mb-0">{this.state.data.heading}</h3>
                                </div>
                                <select name="selectList" id="selectList" style={{width: 125, border: "solid"}} onChange={this.handleChange}>
                                  <option value="All">All</option>
                                  <option value="Ethereum">Ethereum</option>
                                  <option value="Solana">Solana</option>
                                  <option value="Eluvio">Eluvio</option>
                                  <option value="Avalanche">Avalanche</option>
                                  <option value="Aptos">Aptos</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {this.state.exploreData.map((item, idx) => {
                            return (
                                <div key={`edt_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                    <div className="card">
                                        <div className="image-over">
                                            <a href="/item-details">
                                                <img className="card-img-top" src={item.img} alt="" />
                                            </a>
                                        </div>
                                        {/* Card Caption */}
                                        <div className="card-caption col-12 p-0">
                                            {/* Card Body */}
                                            <div className="card-body">
                                                <a href="/item-details">
                                                    <h5 className="mb-0">{item.title}</h5>
                                                </a>
                                                <div className="seller d-flex align-items-center my-3">
                                                    <span>Owned On</span>
                                                    <a href="/author">
                                                        <h6 className="ml-2 mb-0">{item.blockchain}</h6>
                                                    </a>
                                                </div>
                                                <div className="card-bottom d-flex justify-content-between">
                                                    <span>{item.price}</span>
                                                    <span>{item.count}</span>
                                                </div>
                                                <a className="btn btn-bordered-white btn-smaller mt-3" href="/wallet-connect"><i className="icon-handbag mr-2" />{"View NFT"}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }
}

export default ExploreTwo;