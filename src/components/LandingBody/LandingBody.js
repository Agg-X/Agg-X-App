import React, { Component } from 'react';

const initData = {
    pre_heading: "Features",
    heading: "What do we provide?",
    content: ""
}

const data = [
    {
        id: "1",
        icon: "icon icon-plane text-effect",
        title: "Getting Started",
        content: "Learn how to create an account, set up your wallet, and what you can do on AggX"
    },
    {
        id: "2",
        icon: "icon icon-note text-effect",
        title: "Creating",
        content: "Learn how to mint your very first NFT credential and how to share it on the chain of your choice"
    },
    {
        id: "5",
        icon: "icon icon-link text-effect",
        title: "Partners",
        content: "Learn how you can link your AggX social profile with other media platforms"
    },
    {
        id: "6",
        icon: "icon icon-flag text-effect",
        title: "Developers",
        content: "Learn how you can partner with us to showcase your NFT drops and how you can develop with AggX"
    }
]

class LandingBody extends Component {
    state = {
        initData: {},
        data: []
    }
    componentDidMount(){
        this.setState({
            initData: initData,
            data: data
        })
    }
    render() {
        return (
            <section className="help-center-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center">
                                <span>{this.state.initData.pre_heading}</span>
                                <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                                <p>{this.state.initData.content}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center items">
                        {this.state.data.map((item, idx) => {
                            return (
                                <div key={`hd_${idx}`} className="col-12 col-md-6 col-lg-4 item">
                                    {/* Help Card */}
                                    <div className="card help-card">
                                        <a className="d-block text-center" href="#">
                                            <i className={item.icon} />
                                            <h4>{item.title}</h4>
                                            <p>{item.content}</p>
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

export default LandingBody;