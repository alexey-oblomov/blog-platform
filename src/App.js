import React, {Component} from 'react';
import './App.css';
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

import {setAuthorized, setCurrentUserProfile, articlesLoad} from './redux/actions/actionCreators';
import {
  currentUserRequest,
  loadAllArticlesRequest,
  loadUserArticlesRequest,
} from './services/serverApi.js';
import {isAuth} from './services/localStorageApi.js';
import {baseRoutePath} from './services/paths.js';

class App extends Component {
  updateCurrentUserInStore = async () => {
    const {setAuth, setCurrentUser} = this.props;
    if (isAuth()) {
      const response = await currentUserRequest();
      const {user} = await response.data;
      setCurrentUser(user);
      setAuth(true);
    }
  };

  getListArticles = async () => {
    const {showMode, showQuantity, setArticlesToStore} = this.props;
    if (showMode === '') {
      const response = await loadAllArticlesRequest(showQuantity);
      const {articles, articlesCount} = await response.data;
      setArticlesToStore(articles, articlesCount);
    } else {
      const response = await loadUserArticlesRequest(showQuantity, showMode);
      const {articles, articlesCount} = await response.data;
      setArticlesToStore(articles, articlesCount);
    }
  };

  componentDidMount() {
    this.updateCurrentUserInStore();
    this.getListArticles();
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
  const {showQuantity} = state.articles;
  const {currentUser} = state.currentUser;

  return {
    showQuantity,
    currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setArticlesToStore: (articles, articlesCount) =>
      dispatch(articlesLoad(articles, articlesCount)),
    setCurrentUser: user => dispatch(setCurrentUserProfile(user)),
    setAuth: auth => dispatch(setAuthorized(auth)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
