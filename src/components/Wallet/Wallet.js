import React, { Component } from "react";
import WalletPopup from "./WalletPopup";

const data = {
  preHeading: "Blockchain Connect",
  heading: "Connect to Blockchains",
  content: "",
};

const walletData = [
  {
    id: 1,
    img: "/img/ethereum.png",
    title: "Ethereum",
    content: "",
  },
  {
    id: 2,
    img: "/img/solana.png",
    title: "Solana",
    content: "",
  },
  {
    id: 3,
    img: "/img/eluvio.png",
    title: "Eluv.io",
    content: "",
  },
  {
    id: 4,
    img: "/img/avalanche.svg",
    title: "Avalanche",
    content: "",
  },
  {
    id: 5,
    img: "/img/aptos.png",
    title: "Aptos",
    content: "",
  },
];

class Activity extends Component {
  state = {
    data: {},
    walletData: [],
  };
  componentDidMount() {
    this.setState({
      data: data,
      walletData: walletData,
    });
  }
  render() {
    return (
      <section className="wallet-connect-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              {/* Intro */}
              <div className="intro text-center">
                <span>{this.state.data.preHeading}</span>
                <h3 className="mt-3 mb-0">{this.state.data.heading}</h3>
                <p>{this.state.data.content}</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center items">
            {this.state.walletData.map((item, idx) => {
              return (
                <div
                  key={`wd_${idx}`}
                  className="col-12 col-md-6 col-lg-4 item"
                >
                  {/* Single Wallet */}
                  <div className="card single-wallet">
                    <a className="d-block text-center">
                      <img className="avatar-lg" src={item.img} alt="" />
                      <h4 className="mb-0">{item.title}</h4>
                      <p>{item.content}</p>
                      <WalletPopup id={item.id} />
                    </a>
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

export default Activity;
