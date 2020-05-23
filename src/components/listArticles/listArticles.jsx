import React from 'react';

import axios from 'axios';
import {connect} from 'react-redux';
import {articlesLoaded} from '../../redux/actions/actionCreators';
import {makeHeadersForAuth, isAuth} from '../../utils/utils';
import Preview from '../article/preview.jsx';
import Pagination from '@material-ui/lab/Pagination';

function ListArticles(props) {
  const {articles, articlesCount, history, articlesLoaded} = props;
  const listArticles = articles.map(item => {
    const {slug, favorited} = item;
    return (
      <div key={slug} onClick={event => openArticle(event, slug)}>
        <Preview slug={slug} favorited={favorited} />
      </div>
    );
  });

  const countPaginationBtns = Math.ceil(articlesCount / 9);

  const openArticle = (event, slug) => {
    const isBtnParentClassList = event.target.parentElement.classList.contains('btnLike');
    if (!isBtnParentClassList) {
      history.push(`/blog-platform/articles/${slug}`);
    }
  };

  const handleChangePagination = event => {
    const {show} = props;
    const pageNumber = event.currentTarget.textContent;
    const numberSkipArticles = pageNumber * 9 - 9;
    const username = localStorage.getItem('username');
    let offset = '';
    if (pageNumber > 1) {
      offset = `&offset=${numberSkipArticles}`;
    }

    if (isAuth()) {
      const headers = makeHeadersForAuth();
      if (show === 'all') {
        axios
          .get(`https://conduit.productionready.io/api/articles?limit=9${offset}`, {headers})
          .then(response => {
            const {articles, articlesCount} = response.data;
            articlesLoaded(articles, articlesCount);
          });
      } else {
        axios
          .get(
            `https://conduit.productionready.io/api/articles?limit=9&author=${username}${offset}`,
            {headers}
          )
          .then(response => {
            const {articles, articlesCount} = response.data;
            articlesLoaded(articles, articlesCount);
          });
      }
    } else {
      axios
        .get(`https://conduit.productionready.io/api/articles?limit=9${offset}`)
        .then(response => {
          const {articles, articlesCount} = response.data;
          articlesLoaded(articles, articlesCount);
        });
    }
  };

  const propsPagination = {
    count: countPaginationBtns,
    variant: 'outlined',
    shape: 'rounded',
    onChange: handleChangePagination,
    defaultPage: 1,
    articles: articles,
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
        {listArticles}
      </div>
      <div style={{marginLeft: 'auto', marginRight: 'auto', maxWidth: '500px'}}>
        <Pagination {...propsPagination} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const {articles, articlesCount, autorized, show} = state;
  return {
    articles,
    articlesCount,
    autorized,
    show,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    articlesLoaded: (articles, articlesCount) => dispatch(articlesLoaded(articles, articlesCount)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListArticles);
