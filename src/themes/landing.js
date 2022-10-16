import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import LandingBody from '../components/LandingBody/LandingBody';
import Faq from '../components/Faq/Faq';
import Work from '../components/Work/Work';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class Landing extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Hero />
                <Work />
                <LandingBody />
                <Faq />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default Landing;