import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// importing all the themes
import Landing from "../themes/landing";
import ExploreOne from "../themes/explore-one";
import ItemDetails from "../themes/item-details";
import LandingBody from "../themes/landing-body";
import Authors from "../themes/authors";
import Author from "../themes/author";
import WalletConnect from "../themes/wallet-connect";
import Create from "../themes/create";
import Login from "../themes/login";
import Signup from "../themes/signup";
import Connect2Eluvio from './../components/Wallet/Eluvio/Connect2Eluvio';

class MyRouts extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing/>} />
            <Route exact path="/explore-1" element={<ExploreOne/>} />
            <Route exact path="/item-details" element={<ItemDetails/>} />
            <Route exact path="/help-center" element={<LandingBody/>} />
            <Route exact path="/authors" element={<Authors/>} />
            <Route exact path="/author" element={<Author/>} />
            <Route exact path="/wallet-connect" element={<WalletConnect/>} />
            <Route exact path="/create" element={<Create/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} />
          </Routes>
        </Router>
      </div>
    );
  }
}
export default MyRouts;