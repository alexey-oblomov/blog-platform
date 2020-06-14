import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import Preview from '../article/articlePreview.jsx';
import Pagination from '@material-ui/lab/Pagination';

import {articlesLoad, setCurrentMenuItem} from '../../redux/actions/actionCreators';
import {
  loadAllArticlesRequest,
  loadUserArticlesRequest,
  loadAllArticlesWithOffsetRequest,
  loadUserlArticlesWithOffsetRequest,
} from '../../services/serverApi';
import {baseRoutePath} from '../../services/paths.js';

class ListArticles extends Component {
  listArticlesRequest = async () => {
    const {filterByAuthor, showQuantity, setArticlesToState} = this.props;
    if (filterByAuthor === '') {
      const response = await loadAllArticlesRequest(showQuantity);
      const {articles, articlesCount} = await response.data;
      setArticlesToState(articles, articlesCount);
    } else {
      const response = await loadUserArticlesRequest(showQuantity, filterByAuthor);
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
      history.push(`${baseRoutePath}/articles/${slug}`);
    }
  };

  handleChangePagination = async event => {
    let {filterByAuthor, setArticlesToState, showQuantity, articlesCount} = this.props;
    const pageNumber = Number(event.currentTarget.textContent);
    const username = filterByAuthor;
    const offset = pageNumber > 1 ? pageNumber * showQuantity - showQuantity : null;

    const lastPage = Math.ceil(articlesCount / showQuantity);
    const quantityArticlesOnLastPage = pageNumber * showQuantity - articlesCount;
    if (pageNumber === lastPage) {
      showQuantity = quantityArticlesOnLastPage;
    }

    if (filterByAuthor === '') {
      const response = await loadAllArticlesWithOffsetRequest(showQuantity, offset);
      const {articles, articlesCount} = await response.data;
      setArticlesToState(articles, articlesCount);
    } else {
      const response = await loadUserlArticlesWithOffsetRequest(showQuantity, username, offset);
      const {articles, articlesCount} = await response.data;
      setArticlesToState(articles, articlesCount);
    }
  };

  componentDidMount() {
    const {setCurrentMenuItem, filterByAuthor, currentUser} = this.props;
    switch (filterByAuthor) {
      case '':
        setCurrentMenuItem('showAllArticles');
        break;
      case currentUser.username:
        setCurrentMenuItem('showMyArticles');
        break;
      default:
        setCurrentMenuItem('');
    }
    this.listArticlesRequest();
  }

  render() {
    const {listArticles, articlesCount, history, showQuantity} = this.props;
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

    const countPaginationBtns = Math.ceil(articlesCount / showQuantity);
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
  const {listArticles, articlesCount, filterByAuthor, showQuantity} = state.articles;
  const {isAuthorized, currentUser} = state.currentUser;
  const {currentMenuItem} = state.personalArea;

  return {
    listArticles,
    articlesCount,
    isAuthorized,
    filterByAuthor,
    showQuantity,
    currentMenuItem,
    currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setArticlesToState: () => {
      const asyncSetArticlesToState = (listArticles, articlesCount) => {
        return dispatch => {
          console.log('Работаем ассинхронно');
          dispatch(articlesLoad(listArticles, articlesCount));
        };
      };
      asyncSetArticlesToState();
    },
    setCurrentMenuItem: page => dispatch(setCurrentMenuItem(page)),
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
