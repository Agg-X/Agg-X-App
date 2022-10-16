import React, { Component } from "react";
import Status from "../Status/Status"

const data = {
  preHeading: "Blockchain Connect",
  heading: "Connect to Blockchains",
  content:
    "Select desired blockchain and connect to it via wallet connectors",
};

const walletData = [
  {
    id: 1,
    img: "/img/ethereum.png",
    title: "Ethereum",
    content:
      "Ethereum is an open-source blockchain platform for decentralized applications (DApps) and embedded with a native digital currency, ether (ETH)",
  },
  {
    id: 2,
    img: "/img/solana.png",
    title: "Solana",
    content:
      "Solana is a network designed to provide developers with a highly performant Web 3.0 cloud platform that offers scalability at the Layer 1 blockchain level.",
  },
  {
    id: 3,
    img: "/img/eluvio.png",
    title: "Eluv.io",
    content:
      "Eluvio is a content blockchain for owner-controlled storage, distribution, and monetization of digital content at scale.",
  },
  {
    id: 4,
    img: "/img/avalanche.svg",
    title: "Avalanche",
    content:
      "Avalanche is an open-source blockchain platform for launching enterprise blockchain deployments in a highly scalable ecosystem",
  },
  {
    id: 5,
    img: "/img/aptos.png",
    title: "Aptos",
    content:
      "Aptos is a scalable and modular Layer 1 blockchain that leverages novel approaches to transaction flow, parallel execution, and the transaction processing lifecycle",
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
                    <a className="d-block text-center" href="/login">
                      <img className="avatar-lg" src={item.img} alt="" />
                      <h4 className="mb-0">{item.title}</h4>
                      <p>{item.content}</p>
                    </a>
                    <Status/>
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
