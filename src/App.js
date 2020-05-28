import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

import Home from './components/home/home.jsx';
import Signup from './components/signup/signup.jsx';
import Login from './components/login/login.jsx';
import Article from './components/article/article.jsx';
import {Add} from './components/add/add.jsx';
import Edit from './components/edit/edit.jsx';
import {Navbar} from './components/navbar/navbar.jsx';

import {setAuthorized} from './redux/actions/actionCreators';
import {isAuth} from './utils/utils.js';

function App(props) {
  const {setAuth} = props;
  if (isAuth()) {
    setAuth(true);
  } else {
    setAuth(false);
  }

  return (
    <div className="app">
      <Navbar />
      <Route exact path="/blog-platform" component={Home} />
      <Route path="/blog-platform/signup" component={Signup} />
      <Route path="/blog-platform/login" component={Login} />
      <Route exact path="/blog-platform/articles/:slug" component={Article} />
      <Route path="/blog-platform/add" component={Add} />
      <Route path="/blog-platform/articles/:slug/edit" component={Edit} />
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    setAuth: auth => dispatch(setAuthorized(auth)),
  };
};

export default connect(null, mapDispatchToProps)(App);
