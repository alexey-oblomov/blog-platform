import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {articlesLoaded, authorized, setCurrentMenuItem} from '../../redux/actions/actionCreators';
import {makeHeadersForAuth, isAuth} from '../../utils/utils';
import PersonalArea from '../personalArea/personalArea.jsx';
import ListArticles from '../listArticles/listArticles.jsx';

class Home extends Component {
  getListArticles = () => {
    const {authorized, show} = this.props;
    const username = localStorage.getItem('username');
    if (authorized) {
      const headers = makeHeadersForAuth();
      if (show === 'all') {
        axios
          .get(`https://conduit.productionready.io/api/articles?limit=9`, {headers})
          .then(response => {
            const {articles, articlesCount} = response.data;
            articlesLoaded(articles, articlesCount);
            setCurrentMenuItem('showAllArticles');
          });
      } else {
        axios
          .get(`https://conduit.productionready.io/api/articles?limit=9&author=${username}`, {
            headers,
          })
          .then(response => {
            const {articles, articlesCount} = response.data;
            articlesLoaded(articles, articlesCount);
            setCurrentMenuItem('showMyArticles');
          });
      }
    }
  };

  setAuthorization = () => {
    const {authorization} = this.props;
    const auth = isAuth();
    authorization(auth);
  };

  componentDidMount() {
    const {history} = this.props;
    const auth = isAuth();
    if (auth) {
      this.getListArticles();
    } else {
      history.push('/blog-platform/login');
    }
  }

  render() {
    const {history} = this.props;

    return (
      <>
        <div style={{marginTop: '15px'}}>
          <div style={{display: 'flex', marginBottom: '15px'}}>
            <PersonalArea history={history} />
            <ListArticles history={history} />
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const {articles, articlesCount, isAutorized, showAll, currentUser, currentMenuItem} = state;
  return {
    articles,
    articlesCount,
    isAutorized,
    showAll,
    currentUser,
    currentMenuItem,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    articlesLoaded: (articles, articlesCount) => dispatch(articlesLoaded(articles, articlesCount)),
    authorization: auth => dispatch(authorized(auth)),
    setCurrentMenuItem: currentMenuItem => dispatch(setCurrentMenuItem(currentMenuItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
