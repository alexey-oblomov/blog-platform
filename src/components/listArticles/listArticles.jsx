import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import {articlesLoaded, setCurrentPage} from '../../redux/actions/actionCreators';
import {
  loadAllArticles,
  loadUserArticles,
  loadAllArticlesWithOffset,
  loadUserlArticlesWithOffset,
} from '../../services/serverApi';

import Preview from '../article/preview.jsx';
import Pagination from '@material-ui/lab/Pagination';

class ListArticles extends Component {
  getListArticles = async () => {
    const {showMode, showQuantity, setArticlesToState} = this.props;
    if (showMode === '') {
      const response = await loadAllArticles(showQuantity);
      const {articles, articlesCount} = await response.data;
      setArticlesToState(articles, articlesCount);
    } else {
      const response = await loadUserArticles(showQuantity, showMode);
      const {articles, articlesCount} = await response.data;
      setArticlesToState(articles, articlesCount);
    }
  };

  openArticle = (event, slug) => {
    const {history} = this.props;
    const btnClassList =
      event.target.parentElement.classList.contains('btnLike') ||
      event.target.parentElement.classList.contains('btnDelete') ||
      event.target.classList.contains('authorDiv');
    if (!btnClassList) {
      history.push(`/blog-platform/articles/${slug}`);
    }
  };

  handleChangePagination = async event => {
    const {showMode, setArticlesToState, showQuantity} = this.props;
    const pageNumber = event.currentTarget.textContent;
    const username = showMode;
    const offset = pageNumber > 1 ? pageNumber * 9 - 9 : null;

    if (showMode === '') {
      const response = await loadAllArticlesWithOffset(showQuantity, offset);
      const {articles, articlesCount} = await response.data;
      setArticlesToState(articles, articlesCount);
    } else {
      const response = await loadUserlArticlesWithOffset(showQuantity, username, offset);
      const {articles, articlesCount} = await response.data;
      setArticlesToState(articles, articlesCount);
    }
  };

  componentDidMount() {
    const {setCurrentPage, showMode, currentUser} = this.props;
    switch (showMode) {
      case '':
        setCurrentPage('showAllArticles');
        break;
      case currentUser.username:
        setCurrentPage('showMyArticles');
        break;
      default:
        setCurrentPage('');
    }
    this.getListArticles();
  }

  render() {
    const {listArticles, articlesCount, history} = this.props;
    const mapedListArticles = listArticles.map(item => {
      const {slug} = item;
      return (
        <div key={slug} onClick={event => this.openArticle(event, slug)}>
          <CardDiv>
            <Preview slug={slug} history={history} />
          </CardDiv>
        </div>
      );
    });

    const countPaginationBtns = Math.ceil(articlesCount / 9);
    const propsPagination = {
      count: countPaginationBtns,
      variant: 'outlined',
      shape: 'rounded',
      onChange: this.handleChangePagination,
      articles: listArticles,
    };

    return (
      <ContainerDiv>
        <ListArticlesWrapDiv>{mapedListArticles}</ListArticlesWrapDiv>
        <PaginationDiv>
          <Pagination {...propsPagination} />
        </PaginationDiv>
      </ContainerDiv>
    );
  }
}

const mapStateToProps = state => {
  const {
    listArticles,
    articlesCount,
    isAuthorized,
    showMode,
    showQuantity,
    currentPage,
    currentUser,
  } = state;
  return {
    listArticles,
    articlesCount,
    isAuthorized,
    showMode,
    showQuantity,
    currentPage,
    currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setArticlesToState: (listArticles, articlesCount) =>
      dispatch(articlesLoaded(listArticles, articlesCount)),
    setCurrentPage: page => dispatch(setCurrentPage(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListArticles);

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListArticlesWrapDiv = styled.div`
  display: flex;
  min-width: 840px;
  max-width: 1100px;
  flex-wrap: wrap;
  flex-grow: 1;
  margin-bottom: 15px;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
`;

const CardDiv = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 0 0 6px 0 #34495e;
  cursor: pointer;
  width: 250px;
  height: 280px;
  margin: 15px;
  margin-top: 5px;
  transition: 0.1s;
  &:hover {
    transform: scale(1.03);
  }
  display: flex;
  flex-direction: column;
`;

const PaginationDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  flex-grow: 0;
`;
