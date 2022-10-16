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
        title: "Gallery",
        content: "Learn how to create an account, set up your wallet, and display your NFTs on AggX"
    },
    {
        id: "2",
        icon: "icon icon-link text-effect",
        title: "Community",
        content: "Learn how you can link your social profiles on AggX and interact with other collectors"
    },
    {
        id: "3",
        icon: "icon icon-note text-effect",
        title: "Credentials",
        content: "Learn how to mint your very first credential NFT and how to share it on the chain of your choice"
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