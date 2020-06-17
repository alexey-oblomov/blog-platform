import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

import {HomePageContainer} from './components/home';
import {SignupPageContainer} from './components/signup';
import {LoginPageContainer} from './components/login';
import {ArticlePageContainer} from './components/article';
import {UserProfilePageContainer} from './components/user';
import {CreateArticlePageContainer} from './components/createArticle';
import {EditArticlePageContainer} from './components/editArticle';
import {Navbar} from './components/navbar';

import {setCurrentUserProfile, setAuthorized} from './redux/actions/currentUser/createActions.js';

import {currentUserRequest} from './services/serverApi.js';
import {isAuth} from './services/localStorageApi.js';
import {baseRoutePath} from './services/paths.js';

class App extends Component {
  updateCurrentUserInStore = async () => {
    const {setAuth, setCurrentUser} = this.props;
    if (isAuth()) {
      const response = await currentUserRequest();
      const {user: currentUser} = await response.data;
      setCurrentUser({currentUser});
      setAuth({isAuthorized: true});
    }
  };

  componentDidMount() {
    this.updateCurrentUserInStore();
  }

  render() {
    return (
      <div className="app">
        <Navbar />
        <Route exact path={baseRoutePath} component={HomePageContainer} />
        <Route path={`${baseRoutePath}/signup`} component={SignupPageContainer} />
        <Route path={`${baseRoutePath}/login`} component={LoginPageContainer} />
        <Route path={`${baseRoutePath}/add`} component={CreateArticlePageContainer} />
        <Route exact path={`${baseRoutePath}/articles/:slug`} component={ArticlePageContainer} />
        <Route
          exact
          path={`${baseRoutePath}/user/:username`}
          component={UserProfilePageContainer}
        />
        <Route path={`${baseRoutePath}/articles/:slug/edit`} component={EditArticlePageContainer} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {currentUser} = state.currentUser;

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
