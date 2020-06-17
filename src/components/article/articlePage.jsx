import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {uniqueId} from 'lodash';
import {formatDistanceToNow} from 'date-fns';
import {ru} from 'date-fns/locale';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Button} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

import {setCurrentMenuItem} from '../../redux/actions/personalArea/createActions.js';

import {
  favoriteArticleRequest,
  unfavoriteArticleRequest,
  deleteArticleRequest,
} from '../../services/serverApi';
import {baseRoutePath} from '../../services/paths.js';

function ArticlePage(props) {
  const [article, setArticle] = useState({
    title: null,
    author: {username: null},
    body: null,
    favorited: null,
    favoritesCount: null,
    tagList: [],
  });

  const getArticleFromStoreToState = async () => {
    const {slug, listArticles} = props;
    if (listArticles) {
      const article = listArticles.find(item => item.slug === slug);
      setArticle(article);
    }
  };

  useEffect(() => {
    const {setCurrentMenuItem} = props;
    getArticleFromStoreToState();
    setCurrentMenuItem('');
  });

  // useEffect(async () => {
  //   const { slug } = props;
  //   const response = await favoriteArticleRequest(slug);
  //   const { article } = await response.data;
  //   await setArticle(article);
  // }, {});

  // useEffect(async () => {
  //   const { slug } = props;
  //   const response = await unfavoriteArticleRequest(slug);
  //   const { article } = await response.data;
  //   await setArticle(article);
  // }, {});

  if (!article) {
    return null;
  }

  const handleFavoriteChange = isFavorited => {
    if (isFavorited) {
      setUnfavorited();
    } else {
      setFavorited();
    }
  };

  const setFavorited = async () => {
    const {slug} = props;
    const response = await favoriteArticleRequest(slug);
    const {article} = await response.data;
    console.log('article: ', article);
    // await setArticle(article);
  };

  const setUnfavorited = async () => {
    const {slug} = props;
    const response = await unfavoriteArticleRequest(slug);
    // const { article } = await response.data;
    // console.log('article: ', article);
    // await setArticle(article);
  };

  const handleToEditArticle = () => {
    const {slug, history} = props;
    history.push(`${baseRoutePath}/articles/${slug}/edit`);
  };

  const handleDeleteArticle = async () => {
    const {slug, history} = props;
    const response = await deleteArticleRequest(slug);
    if (response.status === 200) {
      history.push(baseRoutePath);
    }
  };

  const {isAuthorized, currentUser} = props;
  const {
    title,
    author,
    body,
    tagList = [],
    favorited: isFavorited,
    favoritesCount,
    createdAt,
    updatedAt,
  } = article;

  const paperProps = {
    component: 'ul',
    className: '',
    elevation: 0,
    style: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      listStyle: 'none',
      paddingLeft: '10px',
    },
  };

  const chipProps = {
    disabled: true,
    color: 'primary',
    style: {maxWidth: '120px', overflow: 'hidden'},
  };

  const tags = () => (
    <TagsListDiv>
      <Paper {...paperProps}>
        {tagList.map(item => {
          return (
            <li key={uniqueId()} style={{margin: '5px'}}>
              <Chip {...chipProps} label={item} />
            </li>
          );
        })}
      </Paper>
    </TagsListDiv>
  );

  const diffDateCreate = date => {
    if (!date) {
      return;
    }
    return formatDistanceToNow(new Date(date), {
      locale: ru,
    });
  };

  const createData = diffDateCreate(createdAt);
  const updateData = diffDateCreate(updatedAt);
  const isModifed = createdAt === updatedAt ? false : true;

  const btnEdit =
    isAuthorized && currentUser.username === author.username ? (
      <ButtonDiv>
        <Button variant="contained" size="small" onClick={handleToEditArticle}>
          Редактировать
        </Button>
      </ButtonDiv>
    ) : null;

  const btnDelete =
    isAuthorized && currentUser.username === author.username ? (
      <ButtonDiv>
        <Button variant="contained" size="small" onClick={handleDeleteArticle}>
          Удалить
        </Button>
      </ButtonDiv>
    ) : null;

  const btnLikeProps = {
    className: 'btnLike',
    color: 'primary',
    style: {fontSize: 30},
    onClick: event => handleFavoriteChange(isFavorited),
  };

  const btnLike = () =>
    isAuthorized ? (
      isFavorited ? (
        <Tooltip title="Убрать лайк">
          <FavoriteIcon {...btnLikeProps} />
        </Tooltip>
      ) : (
        <Tooltip title="Поставить лайк">
          <FavoriteBorderIcon {...btnLikeProps} />
        </Tooltip>
      )
    ) : (
      <Tooltip title="Для возможности лайкать необходимо авторизоваться">
        <FavoriteBorderIcon {...btnLikeProps} />
      </Tooltip>
    );

  return (
    <ContainerDiv>
      <ButtonBlockDiv>
        {btnEdit}
        {btnDelete}
      </ButtonBlockDiv>

      <MainSectionDiv>
        <TitleDiv>{title}</TitleDiv>
        <AuthorDiv>{author.username}</AuthorDiv>

        <CreateDateDiv>
          <span>Создано: </span>
          {createData} назад
        </CreateDateDiv>

        <UpdateDateDiv>
          {isModifed ? (
            <>
              <span>Изменено: </span>
              {updateData} назад
            </>
          ) : null}
        </UpdateDateDiv>

        <BodyDiv>{body}</BodyDiv>
        <div>{tags()}</div>
        <LikeBlock className="btnLike">
          <ButtonLike className="btnLike">{btnLike()}</ButtonLike>
          <LikeCount>{favoritesCount}</LikeCount>
        </LikeBlock>
      </MainSectionDiv>
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 840px;
  max-width: 950px;
  min-height: 800px;
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 0 0 6px 0 #34495e;
  padding: 12px;
  margin: 5px;
  margin-right: 15px;
`;

const MainSectionDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonBlockDiv = styled.div`
  display: flex;
`;

const ButtonDiv = styled.div`
  margin: 10px;
`;

const TitleDiv = styled.div`
  font-size: 22px;
  overflow-wrap: break-word;
  padding-left: 10px;
`;

const AuthorDiv = styled.div`
  padding: 10px;
`;

const CreateDateDiv = styled.div`
  padding-left: 10px;
`;

const UpdateDateDiv = styled.div`
  padding-left: 10px;
  color: red;
`;

const BodyDiv = styled.div`
  margin-bottom: 10px;
  overflow-wrap: break-word;
  padding: 10px;
`;

const LikeBlock = styled.div`
  display: flex;
  cursor: pointer;
  padding: 10px;
`;

const ButtonLike = styled.div`
  margin-right: 5px;
`;

const LikeCount = styled.div`
  color: #3f51b5;
  font-size: 25px;
`;

const TagsListDiv = styled.div`
  padding: '0';
`;

const mapStateToProps = state => {
  const {listArticles} = state.articles;
  const {currentUser, isAuthorized} = state.currentUser;
  return {
    listArticles,
    currentUser,
    isAuthorized,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentMenuItem: item => dispatch(setCurrentMenuItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
