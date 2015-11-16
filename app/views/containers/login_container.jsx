import React, {Component} from "react";
import _                  from "lodash";
import {connect}          from "react-redux";
import Login              from "app/views/auth/login";
import {authenticate,initCsrf}     from "app/action_creators/session_action_creator";
import {isTokenSet}       from "app/api/auth_token";


const select = (state) => ({
  authenticationError: state.session.authenticationError
});

/**
* This is the entry point for any page that requires a logged in user
*/
@connect(select)
export default class LoginContainer extends Component {

  componentWillMount() {
    this.props.dispatch(initCsrf())
  }

  render () {
    return (
      <Login onSubmit={this._handleSubmit.bind(this)}
        authenticationError={this.props.authenticationError}/>
    );
  }

  _handleSubmit ({email, password}) {
    const {dispatch} = this.props;

    // dispatch(authenticate(email, password)).then((result) => {
    //   if (result.apiError) return;

      this.props.history.pushState(null, "/reports");
    // });
  }

}
