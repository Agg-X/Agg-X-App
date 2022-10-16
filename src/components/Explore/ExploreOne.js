import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json/explore";

class ExploreTwo extends Component {
    state = {
        data: {},
        exploreData: []
    }
    componentDidMount(){
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    exploreData: res.data.exploreData
                })
                // console.log(this.state.data)
            })
        .catch(err => console.log(err))
    }

    handleChange(){
        console.log("change the filtered display")
        //Add filter logic
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
                                {/* <div className="intro-btn">
                                    <a className="btn content-btn" href="/explore-1">{this.state.data.btnText}</a>
                                </div>
                                <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
                                <li>
                                    <a className="active" id="nav-home-tab" data-toggle="pill" href="#nav-home">
                                        <h5 className="m-0">{"1"}</h5>
                                    </a>
                                </li>
                                <li>
                                    <a id="nav-profile-tab" data-toggle="pill" href="#nav-profile">
                                        <h5 className="m-0">{"2"}</h5>
                                    </a>
                                </li>
                                <li>
                                    <a id="nav-contact-tab" data-toggle="pill" href="#nav-contact">
                                        <h5 className="m-0">{"3"}</h5>
                                    </a>
                                </li>
                            </ul> */}
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
                                                    <span>Owned By</span>
                                                    <a href="/author">
                                                        <h6 className="ml-2 mb-0">{item.owner}</h6>
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