import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

import Home from './components/home/home.jsx';
import Signup from './components/signup/signup.jsx';
import Login from './components/login/login.jsx';
import Article from './components/article/article.jsx';
import User from './components/user/user.jsx';
import Add from './components/add/add.jsx';
import Edit from './components/edit/edit.jsx';
import {Navbar} from './components/navbar/navbar.jsx';

import {setAuthorized, setCurrentUserProfile} from './redux/actions/actionCreators';
import {isAuth, makeHeadersForAuth, getCurrentUserFromServer} from './utils/api.js';

function App(props) {
  const updateCurrentUserInState = async headers => {
    const {setCurrentUser} = props;
    const response = await getCurrentUserFromServer(headers);
    const {user} = await response.data;
    setCurrentUser(user);
  };

  const {setAuth} = props;
  if (isAuth()) {
    setAuth(true);
    const authHeaders = makeHeadersForAuth();
    updateCurrentUserInState(authHeaders);
  } else {
    setAuth(false);
  }

  return (
    <div className="app">
      <Navbar />
      <Route exact path="/blog-platform" component={Home} />
      <Route path="/blog-platform/signup" component={Signup} />
      <Route path="/blog-platform/login" component={Login} />
      <Route path="/blog-platform/add" component={Add} />
      <Route exact path="/blog-platform/articles/:slug" component={Article} />
      <Route exact path="/blog-platform/user/:username" component={User} />
      <Route path="/blog-platform/articles/:slug/edit" component={Edit} />
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(setCurrentUserProfile(user)),
    setAuth: auth => dispatch(setAuthorized(auth)),
  };
};

export default connect(null, mapDispatchToProps)(App);
