import React, { Component } from 'react';
import AuthorProfile from "../AuthorProfile/AuthorProfile";




class Create extends Component {
  state = {
    chain: "",
    NFTs: 0
  };
  handleChange = (event) => {
    // console.log()
    //Add filter logic
    if (event.target.value == "Ethereum") {
      this.setState({
        chain: "Ethereum",
        NFTs: 23
      });
    } else if (event.target.value == "Solana") {
      this.setState({
        chain: "Solana",
        NFTs: 12,
      });
    } else if (event.target.value == "Eluvio") {
      this.setState({
        chain: "Eluvio",
        NFTs: 3,
      });
    } else if (event.target.value == "Avalanche") {
      this.setState({
        chain: "Avalanche",
        NFTs: 21,
      });
    } else if (event.target.value == "Aptos") {
      this.setState({
        chain: "Aptos",
        NFTs: 5,
      });
    }
  };


  render() {
    return (
      <section className="author-area">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12 col-md-4">
              {/* Author Profile */}
              <AuthorProfile />
            </div>
            <div className="col-12 col-md-7">
              {/* Intro */}
              <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                <div className="intro-content">
                  <span>Get Started</span>
                  <h3 className="mt-3 mb-0">
                    Mint Your Credential NFT Cross-Chain
                  </h3>
                </div>
              </div>
              {/* Item Form */}
              <form className="item-form card no-hover">
                <div className="row">
                  <div className="col-12">
                    <div className="input-group form-group">
                      <select
                        name="selectList"
                        id="selectList"
                        onChange={this.handleChange}
                      >
                        <option value="Select">
                          Select Your Source Branch
                        </option>
                        <option value="Ethereum">Ethereum</option> {" "}
                        <option value="Solana">Solana</option>
                        <option value="Eluvio">Eluvio</option>
                        <option value="Avalanche">Avalanche</option>
                        <option value="Aptos">Aptos</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group form-group">
                      <select name="selectList" id="selectList">
                        <option value="Select">
                          Select Your Destination Branch
                        </option>
                        <option value="Ethereum">Ethereum</option> {" "}
                        <option value="Solana">Solana</option>
                        <option value="Eluvio">Eluvio</option>
                        <option value="Avalanche">Avalanche</option>
                        <option value="Aptos">Aptos</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      You have {this.state.NFTs} NFTs on this chain
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      Mint Cost : 0.05 ETH
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      Gas Fee : {0.01+Math.random() * 0.02} ETH
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group mt-3">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          defaultValue="option1"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio1"
                        >
                          Put on Upgradeable
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          defaultValue="option2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2"
                        >
                          Non-Transferable
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn w-100 mt-3 mt-sm-4" type="submit">
                      Mint NFT
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Create;