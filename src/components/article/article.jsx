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
import CircularProgress from '@material-ui/core/CircularProgress';

import {setCurrentMenuItem} from '../../redux/actions/personalArea/createActions.js';
import {updateListArticles} from '../../redux/actions/articles/createActions.js';
import {
  favoriteArticleRequest,
  unfavoriteArticleRequest,
  deleteArticleRequest,
} from '../../services/serverApi';
import {baseRoutePath} from '../../services/paths.js';

function ArticlePage(props) {
  const [article, setArticle] = useState({});

  const getArticleFromStoreToState = async () => {
    const {slug, listArticles, history} = props;
    if (listArticles.length !== 0) {
      const article = listArticles.find(item => item.slug === slug);
      setArticle(article);
    } else {
      history.push(baseRoutePath);
    }
  };

  useEffect(() => {
    const {setCurrentMenuItem} = props;
    getArticleFromStoreToState();
    setCurrentMenuItem('');
  }, []);

  if (!article) {
    return <CircularProgress />;
  }

  const replaceArticleInStore = article => {
    const {listArticles, updateListArticles} = props;
    const idx = listArticles.findIndex(item => item.slug === article.slug);
    listArticles.splice(idx, 1, article);
    updateListArticles({listArticles});
  };

  const handleFavoriteToggle = async () => {
    const {favorited, slug} = article;
    if (favorited) {
      const response = await unfavoriteArticleRequest(slug);
      const {article} = response.data;
      replaceArticleInStore(article);
      setArticle(article);
    } else {
      const response = await favoriteArticleRequest(slug);
      const {article} = response.data;
      replaceArticleInStore(article);
      setArticle(article);
    }
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
    isAuthorized && author && currentUser.username === author.username ? (
      <ButtonDiv>
        <Button variant="contained" size="small" onClick={handleToEditArticle}>
          Редактировать
        </Button>
      </ButtonDiv>
    ) : null;

  const btnDelete =
    isAuthorized && author && currentUser.username === author.username ? (
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
    onClick: handleFavoriteToggle,
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
        <FavoriteBorderIcon />
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
        <AuthorDiv>{author ? author.username : null}</AuthorDiv>

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
  min-width: 820px;
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
    updateListArticles: listArticles => {
      dispatch(updateListArticles(listArticles));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
