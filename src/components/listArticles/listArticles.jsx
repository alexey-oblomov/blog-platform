import React, {useEffect} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import Preview from '../article/articlePreview';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';

import {setCurrentMenuItem} from '../../redux/actions/personalArea/createActions';
import {baseRoutePath} from '../../services/paths';
import {loadArticles} from '../../redux/actions/articles/createActions';

function ListArticles(props) {
  const updateListArticles = () => {
    const {filterByAuthor, numberArticlesToDisplay, setArticlesToStoreAsync} = props;
    setArticlesToStoreAsync(numberArticlesToDisplay, filterByAuthor);
  };

  const openArticle = (event, slug) => {
    const {history} = props;
    const btnClassList =
      event.target.parentElement.classList.contains('btnLike') ||
      event.target.parentElement.classList.contains('btnDelete') ||
      event.target.classList.contains('authorDiv');
    if (!btnClassList) {
      history.push(`${baseRoutePath}/articles/${slug}`);
    }
  };

  const handleChangePagination = async event => {
    let {filterByAuthor, numberArticlesToDisplay, articlesCount, setArticlesToStoreAsync} = props;
    const pageNumber = Number(event.currentTarget.textContent);
    const offsetArticles =
      pageNumber > 1 ? pageNumber * numberArticlesToDisplay - numberArticlesToDisplay : null;

    const lastPageNumber = Math.ceil(articlesCount / numberArticlesToDisplay);
    const numberArticlesOnLastPage = articlesCount - (pageNumber - 1) * numberArticlesToDisplay;
    if (pageNumber === lastPageNumber) {
      numberArticlesToDisplay = numberArticlesOnLastPage;
    }

    setArticlesToStoreAsync(numberArticlesToDisplay, filterByAuthor, offsetArticles);
  };

  const updateCurrentMenuItem = () => {
    const {setCurrentMenuItem, filterByAuthor, currentUser} = props;
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
  };

  useEffect(() => {
    updateCurrentMenuItem();
    updateListArticles();
  }, []);

  const {listArticles = [], articlesCount, isLoading, history, numberArticlesToDisplay} = props;
  const mapedListArticles = listArticles.map(item => {
    const {slug} = item;
    return (
      <div key={slug} onClick={event => openArticle(event, slug)}>
        <CardDiv>
          <Preview slug={slug} history={history} />
        </CardDiv>
      </div>
    );
  });

  const countPaginationBtns = Math.ceil(articlesCount / numberArticlesToDisplay);
  const propsPagination = {
    count: countPaginationBtns,
    variant: 'outlined',
    shape: 'rounded',
    onChange: handleChangePagination,
    articles: listArticles,
  };

  return (
    <ContainerDiv>
      <ListArticlesWrapDiv>
        {isLoading ? (
          <SpinnerContainer>
            <CircularProgress />
          </SpinnerContainer>
        ) : (
          mapedListArticles
        )}
      </ListArticlesWrapDiv>
      <PaginationDiv>
        <Pagination {...propsPagination} />
      </PaginationDiv>
    </ContainerDiv>
  );
}

const mapStateToProps = state => {
  const {articles, currentUser: user, personalArea} = state;
  const {
    listArticles,
    articlesCount,
    filterByAuthor,
    numberArticlesToDisplay,
    isLoading,
  } = articles;
  const {isAuthorized, currentUser} = user;
  const {currentMenuItem} = personalArea;

  return {
    listArticles,
    articlesCount,
    isAuthorized,
    filterByAuthor,
    numberArticlesToDisplay,
    currentMenuItem,
    currentUser,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setArticlesToStoreAsync: (numberArticlesToDisplay, filterByAuthor) => {
      dispatch(loadArticles(numberArticlesToDisplay, filterByAuthor));
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

const SpinnerContainer = styled.div`
  display: flex;
  margin: auto;
  padding-top: 300px;
  align-content: center;
  justify-content: center;
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
