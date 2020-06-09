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
import {getCurrentUser} from './services/serverApi.js';
import {isAuth} from './services/localStorageApi.js';
import {basePath} from './services/paths.js';

function App(props) {
  const updateCurrentUserInStore = async () => {
    const {setAuth, setCurrentUser} = props;
    if (isAuth()) {
      const response = await getCurrentUser();
      const {user} = await response.data;
      setCurrentUser(user);
      setAuth(true);
    }
  };

  updateCurrentUserInStore();

  return (
    <div className="app">
      <Navbar />
      <Route exact path={basePath} component={Home} />
      <Route path={`${basePath}/signup`} component={Signup} />
      <Route path={`${basePath}/login`} component={Login} />
      <Route path={`${basePath}/add`} component={Add} />
      <Route exact path={`${basePath}/articles/:slug`} component={Article} />
      <Route exact path={`${basePath}/user/:username`} component={User} />
      <Route path={`${basePath}/articles/:slug/edit`} component={Edit} />
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
