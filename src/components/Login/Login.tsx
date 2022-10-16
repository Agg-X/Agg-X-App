import React, { Component, useState } from "react";
import { useToast } from "@chakra-ui/react";

const initData = {
  pre_heading: "Login",
  heading: "Login to your Account",
};

const socialData = [
  {
    id: "1",
    link: "facebook",
    icon: "fab fa-facebook-f",
  },
  {
    id: "2",
    link: "twitter",
    icon: "fab fa-twitter",
  },
  {
    id: "3",
    link: "google-plus",
    icon: "fab fa-google-plus-g",
  },
];

class Login extends Component {
  state: any = {
    initData: {},
    data: [],
  };

  componentDidMount() {
    this.setState({
      initData: initData,
      data: socialData,
    });
  }
  render() {
    const toast = useToast();
    return (
      <section className="author-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              {/* Intro */}
              <div className="intro text-center">
                <span>{"Login"}</span>
                <h3 className="mt-3 mb-0">{"Login to your Account"}</h3>
              </div>
              {/* Item Form */}
              <form
                className="item-form card no-hover"
                action="http://localhost:8080/login"
              >
                <div className="row">
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter your Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Enter your Password"
                        required
                      />
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
                          Remember Me
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn w-100 mt-3 mt-sm-4"
                      type="submit"
                      onClick={() => {
                        toast({
                          title: "Login Success",
                          description: "Welcome",
                          status: "success",
                          duration: 9000,
                          isClosable: true,
                        });
                      }}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="col-12">
                    <span className="d-block text-center mt-4">
                      Do not have an account? <a href="/signup">Signup</a>
                    </span>
                  </div>
                  <div className="col-12">
                    <hr />
                    <div className="other-option">
                      <span className="d-block text-center mb-4">Or</span>
                      {/* Social Icons */}
                      <div className="social-icons d-flex justify-content-center">
                        {this.state.data.map((item: any, idx: any) => {
                          return (
                            <a
                              key={`lsd_${idx}`}
                              className={item.link}
                              href="#"
                            >
                              <i className={item.icon} />
                              <i className={item.icon} />
                            </a>
                          );
                        })}
                      </div>
                    </div>
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

export default Login;
