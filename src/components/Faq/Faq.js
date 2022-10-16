import React, { Component } from 'react';

const initData = {
    pre_heading: "FAQ",
    heading: "Frequently Asked Questions",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit."
}

const data = [
    {
        id: "1",
        btnClass: "btn d-block text-left w-100 py-4",
        target: "#collapseOne",
        quote: "What blockchains does AggX support?",
        contentId: "collapseOne",
        contentClass: "collapse show",
        content: "We support Etherium, Solona, Eluvio, Avalanche, and Aptos."
    },
    {
        id: "2",
        btnClass: "btn d-block text-left w-100 collapsed py-4",
        target: "#collapseTwo",
        quote: "Where can I see transaction details?",
        contentId: "collapseTwo",
        contentClass: "collapse",
        content: "Each NFT has its own profile view which includes the transaction details."
    },
    {
        id: "3",
        btnClass: "btn d-block text-left w-100 collapsed py-4",
        target: "#collapseThree",
        quote: "Can I use Trust Wallet or Metamask?",
        contentId: "collapseThree",
        contentClass: "collapse",
        content: "Yes both are supported, for Metamask please choose connect to Etherium."
    },
    {
        id: "4",
        btnClass: "btn d-block text-left w-100 collapsed py-4",
        target: "#collapseFour",
        quote: "How do I access my NFTs?",
        contentId: "collapseFour",
        contentClass: "collapse",
        content: "Create an AggX account and connect to any blockchains that you own NFTs on."
    },
    {
        id: "5",
        btnClass: "btn d-block text-left w-100 collapsed py-4",
        target: "#collapseFive",
        quote: "How do I create a credential NFT?",
        contentId: "collapseFive",
        contentClass: "collapse",
        content: "You can mint your NFTs to other blockchains using the create view."
    }
]

class Faq extends Component {
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
            <section className="faq-area pt-0">
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
                    <div className="row justify-content-center">
                        <div className="col-12">
                            {/* FAQ Content */}
                            <div className="faq-content">
                                {/* Netstorm Accordion */}
                                <div className="accordion" id="netstorm-accordion">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-10">
                                            {/* Single Accordion Item */}
                                            {this.state.data.map((item, idx) => {
                                                return (
                                                    <div key={`fd_${idx}`} className="single-accordion-item p-3">
                                                        {/* Card Header */}
                                                        <div className="card-header bg-inherit border-0 p-0">
                                                            <h2 className="m-0">
                                                                <button className={item.btnClass} type="button" data-toggle="collapse" data-target={item.target}>
                                                                    {item.quote}
                                                                </button>
                                                            </h2>
                                                        </div>
                                                        <div id={item.contentId} className={item.contentClass} data-parent="#netstorm-accordion">
                                                            {/* Card Body */}
                                                            <div className="card-body py-3">
                                                                {item.content}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Faq;