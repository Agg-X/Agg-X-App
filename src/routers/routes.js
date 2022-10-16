import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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

class MyRouts extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/explore-1" component={ExploreOne} />
            <Route exact path="/item-details" component={ItemDetails} />
            <Route exact path="/help-center" component={LandingBody} />
            <Route exact path="/authors" component={Authors} />
            <Route exact path="/author" component={Author} />
            <Route exact path="/wallet-connect" component={WalletConnect} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default MyRouts;