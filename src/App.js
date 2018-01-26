import React, { Component } from 'react';
import { connect } from "react-redux";

import AppBar from './components/AppBar'
import BatteryList from './components/BatteryList'
import { loginWithEmail } from './store/actions';

class App extends Component {
  render() {
    let main;
    if (this.props.auth) {
      main = <BatteryList />
    } else if (process.env.NODE_ENV !== 'production') {
      this.props.login('admin@test.com', '123456');
      main = <h3>Login to continue</h3>
    }

    return (
      <div>
        <AppBar />
        <div>
          {main}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(loginWithEmail(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
