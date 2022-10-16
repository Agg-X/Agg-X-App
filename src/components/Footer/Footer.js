import React, { Component } from "react";
import axios from "axios";

class Footer extends Component {
  render() {
    return (
      <footer className="footer-area">
        {/* Footer Bottom */}
        <div className="container">
          {/* Copyright Area */}
          <div className="d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
            {/* Copyright Left */}
            <div className="copyright-left">
              ©2022 Cal Hacks 9.0, All Rights Reserved.
            </div>
            {/* Copyright Right */}
            <div className="copyright-right">
              Made with <i className="fas fa-heart" /> By <a href="#">xxx</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
