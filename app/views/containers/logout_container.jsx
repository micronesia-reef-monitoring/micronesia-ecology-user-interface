import React, {Component} from "react";
import _                  from "lodash";
import {connect}          from "react-redux";
import {authenticate}     from "app/action_creators/session_action_creator";
import {getCookieToken}   from "app/api/auth_token";
import {deleteCookie}     from "app/api/auth_token";

const mapStateToProps = (state) => ({
  authenticationError: state.session.authenticationError
});

/**
* This is the entry point for any page that requires a logged in user
*/
@connect(mapStateToProps)
export default class LogoutContainer extends Component {

  componentWillMount() {
    if (getCookieToken()) {
      deleteCookie();
      this.props.history.pushState(null, "/login");
    }
  }

  render () {
    return (
      <div>{this.props.children}</div>
    );
  }

}
