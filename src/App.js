import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

import {HomePageContainer} from './pages/home/';
import {SignupPageContainer} from './pages/signup/';
import {LoginPageContainer} from './pages/login/';
import {ArticlePageContainer} from './pages/article/';
import {UserProfilePageContainer} from './pages/user';
import {CreateArticlePageContainer} from './pages/createArticle';
import {EditArticlePageContainer} from './pages/editArticle';
import {Navbar} from './components/navbar';

import {setCurrentUserProfile, setAuthorized} from './redux/actions/currentUser/createActions.js';

import {currentUserRequest} from './services/serverApi.js';
import {isAuth} from './services/localStorageApi.js';
import {baseRoutePath} from './services/paths.js';

function App(props) {
  const updateCurrentUserInStore = async () => {
    const {setAuth, setCurrentUser} = props;
    if (isAuth()) {
      const response = await currentUserRequest();
      const {user: currentUser} = await response.data;
      setCurrentUser({currentUser});
      setAuth({isAuthorized: true});
    }
  };

  useEffect(() => {
    updateCurrentUserInStore();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Route exact path={baseRoutePath} component={HomePageContainer} />
      <Route path={`${baseRoutePath}/signup`} component={SignupPageContainer} />
      <Route path={`${baseRoutePath}/login`} component={LoginPageContainer} />
      <Route path={`${baseRoutePath}/add`} component={CreateArticlePageContainer} />
      <Route exact path={`${baseRoutePath}/articles/:slug`} component={ArticlePageContainer} />
      <Route exact path={`${baseRoutePath}/user/:username`} component={UserProfilePageContainer} />
      <Route path={`${baseRoutePath}/articles/:slug/edit`} component={EditArticlePageContainer} />
    </div>
  );
}

const mapStateToProps = ({currentUser}) => {
  return {
    currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(setCurrentUserProfile(user)),
    setAuth: auth => dispatch(setAuthorized(auth)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
