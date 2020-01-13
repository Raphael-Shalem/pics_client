import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SignupForm from './components/forms/signupform';
import LoginForm from './components/forms/loginform';
import ProfilePage from './components/pages/profilepage';
import ProfilePage_ from './components/other_user/profilepage_';
import LandingPage from './components/pages/landingpage';
import FeedPage from './components/pages/feedpage';


class App extends Component {
  render() {
    return (
      <div className="App" style={{textAlign:'center'}}>
        <Route exact path = '/' component = { LandingPage } />
        <Route exact path = '/Signup' component = { SignupForm } />
        <Route exact path = '/Login' component = { LoginForm } />
        <Route exact path = '/ProfilePage' component = { ProfilePage } />
        <Route exact path = '/ProfilePage_' component = { ProfilePage_ } />
        <Route exact path = '/FeedPage' component = { FeedPage } />
      </div>
    );
  }
}

export default App;
