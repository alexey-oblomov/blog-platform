import React, {Component} from 'react';

import axios from 'axios';
import {connect} from 'react-redux';
import {articlesLoaded, setCurrentMenuItem, showMode} from '../../redux/actions/actionCreators';
import {
  makeHeadersForAuth,
  loadAllArticles,
  loadUserArticles,
  loadAllArticlesWithOffset,
} from '../../utils/utils';
import Preview from '../article/preview.jsx';
import Pagination from '@material-ui/lab/Pagination';

class ListArticles extends Component {
  getListArticles = async () => {
    const {showMode, showQuantity, setArticlesToState, currentUser, isAuthorized} = this.props;
    const authHeaders = isAuthorized ? makeHeadersForAuth() : null;

    if (showMode === '') {
      const response = await loadAllArticles(showQuantity, authHeaders);
      const {articles, articlesCount} = await response.data;
      setArticlesToState(articles, articlesCount);
      setCurrentMenuItem('showAllArticles');
    } else {
      const response = loadUserArticles(showQuantity, showMode, authHeaders);
      const {articles, articlesCount} = await response.data;
      setArticlesToState(articles, articlesCount);
      if (showMode === currentUser.username) {
        setCurrentMenuItem('showMyArticles');
      } else {
        setCurrentMenuItem('');
      }
    }
  };

  openArticle = (event, slug) => {
    const {history} = this.props;
    const isBtnParentClassList = event.target.parentElement.classList.contains('btnLike');
    if (!isBtnParentClassList) {
      history.push(`/blog-platform/articles/${slug}`);
    }
  };

  handleChangePagination = event => {
    const {showMode, setArticlesToState, isAuthorized, showQuantity} = this.props;
    const pageNumber = event.currentTarget.textContent;
    const numberSkipArticles = pageNumber * 9 - 9;
    const username = showMode;
    let offset = '';
    if (pageNumber > 1) {
      offset = numberSkipArticles;
    }

    if (isAuthorized) {
      const headers = makeHeadersForAuth();
      if (showMode === '') {
        loadAllArticlesWithOffset(showQuantity, offset, headers).then(response => {
          const {articles, articlesCount} = response.data;
          setArticlesToState(articles, articlesCount);
        });
      } else {
        axios
          .get(
            `https://conduit.productionready.io/api/articles?limit=9&author=${username}${offset}`,
            {headers}
          )
          .then(response => {
            const {articles, articlesCount} = response.data;
            setArticlesToState(articles, articlesCount);
          });
      }
    } else {
      axios
        .get(`https://conduit.productionready.io/api/articles?limit=9${offset}`)
        .then(response => {
          const {articles, articlesCount} = response.data;
          setArticlesToState(articles, articlesCount);
        });
    }
  };

  componentDidMount() {
    this.getListArticles();
  }

  render() {
    const {listArticles, articlesCount} = this.props;
    const mapedListArticles = listArticles.map(item => {
      const {slug} = item;
      return (
        <div key={slug} onClick={event => this.openArticle(event, slug)}>
          <Preview slug={slug} />
        </div>
      );
    });

    const countPaginationBtns = Math.ceil(articlesCount / 9);
    const propsPagination = {
      count: countPaginationBtns,
      variant: 'outlined',
      shape: 'rounded',
      onChange: this.handleChangePagination,
      defaultPage: 1,
      articles: listArticles,
    };

    return (
      <div>
        <div
          className="listArticles"
          style={{
            display: 'flex',
            minWidth: '1000px',
            maxWidth: '1600px',
            flexWrap: 'wrap',
            marginBottom: '15px',
          }}
        >
          {mapedListArticles}
        </div>
        <div style={{marginLeft: 'auto', marginRight: 'auto', maxWidth: '500px'}}>
          <Pagination {...propsPagination} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    listArticles,
    articlesCount,
    isAuthorized,
    showMode,
    currentUser,
    currentMenuItem,
    showQuantity,
  } = state;
  return {
    listArticles,
    articlesCount,
    isAuthorized,
    showMode,
    currentUser,
    currentMenuItem,
    showQuantity,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setShowMode: user => dispatch(showMode(user)),
    setArticlesToState: (listArticles, articlesCount) =>
      dispatch(articlesLoaded(listArticles, articlesCount)),
    setCurrentMenuItem: currentMenuItem => dispatch(setCurrentMenuItem(currentMenuItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListArticles);
