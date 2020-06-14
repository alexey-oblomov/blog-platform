import React, {Component} from 'react';
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

import {setCurrentMenuItem} from '../../redux/actions/actionCreators';
import {
  favoriteArticleRequest,
  unfavoriteArticleRequest,
  deleteArticleRequest,
} from '../../services/serverApi';
import {baseRoutePath} from '../../services/paths.js';

class ArticleFullVersion extends Component {
  state = {
    article: {
      title: null,
      author: {username: null},
      body: null,
      favorited: null,
      favoritesCount: null,
      tagList: [],
    },
  };

  getArticleFromStoreToState = async () => {
    const {slug, listArticles} = this.props;
    if (listArticles) {
      const article = listArticles.find(item => item.slug === slug);
      this.setState({
        article,
      });
    } else return;
  };

  handleFavoriteChange = favorited => {
    if (favorited) {
      this.setUnfavorited();
    } else {
      this.setFavorited();
    }
  };

  setFavorited = async () => {
    const {slug} = this.props;
    const response = await favoriteArticleRequest(slug);
    const {article} = response.data;
    this.setState({
      article,
    });
  };

  setUnfavorited = async () => {
    const {slug} = this.props;
    const response = await unfavoriteArticleRequest(slug);
    const {article} = response.data;
    this.setState({
      article,
    });
  };

  toEdit = () => {
    const {slug, history} = this.props;
    history.push(`${baseRoutePath}/articles/${slug}/edit`);
  };

  handleDeleteArticle = async () => {
    const {slug, history} = this.props;
    const response = await deleteArticleRequest(slug);
    if (response.status === 200) {
      history.push(baseRoutePath);
    }
  };

  componentDidMount() {
    const {setCurrentMenuItem} = this.props;
    this.getArticleFromStoreToState();
    setCurrentMenuItem('');
  }

  render() {
    const {isAuthorized, currentUser} = this.props;
    const {article} = this.state;

    if (!article) {
      return null;
    }

    let {title, author, body, tagList, favorited, favoritesCount, createdAt, updatedAt} = article;
    const isModifed = createdAt === updatedAt ? false : true;
    const tags = (
      <TagsListDiv>
        <Paper
          component="ul"
          className=""
          elevation={0}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            listStyle: 'none',
            paddingLeft: '10px',
          }}
        >
          {tagList.map(item => {
            return (
              <li key={uniqueId()} style={{margin: '5px'}}>
                <Chip
                  label={item}
                  disabled
                  color="primary"
                  style={{maxWidth: '120px', overflow: 'hidden'}}
                />
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

    const createDateBlock = (
      <CreateDateDiv>
        <span>Создано: </span>
        {createData} назад
      </CreateDateDiv>
    );

    const updateDateBlock = isModifed ? (
      <UpdateDateDiv>
        <span>Изменено: </span>
        {updateData} назад
      </UpdateDateDiv>
    ) : null;

    const btnEdit =
      isAuthorized && currentUser.username === author.username ? (
        <ButtonDiv>
          <Button variant="contained" size="small" onClick={this.toEdit}>
            Редактировать
          </Button>
        </ButtonDiv>
      ) : null;

    const btnDelete =
      isAuthorized && currentUser.username === author.username ? (
        <ButtonDiv>
          <Button variant="contained" size="small" onClick={this.handleDeleteArticle}>
            Удалить
          </Button>
        </ButtonDiv>
      ) : null;

    const btnLike = isAuthorized ? (
      favorited ? (
        <Tooltip title="Убрать лайк">
          <FavoriteIcon
            className="btnLike"
            alt="like"
            color="primary"
            style={{fontSize: 30}}
            onClick={event => this.handleFavoriteChange(favorited)}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Поставить лайк">
          <FavoriteBorderIcon
            className="btnLike"
            color="primary"
            style={{fontSize: 30}}
            onClick={event => this.handleFavoriteChange(favorited)}
          />
        </Tooltip>
      )
    ) : (
      <Tooltip title="Для возможности лайкать необходимо авторизоваться">
        <FavoriteBorderIcon className="btnLike" alt="like" />
      </Tooltip>
    );

    return (
      <>
        <ContainerDiv>
          <ButtonBlockDiv>
            {btnEdit}
            {btnDelete}
          </ButtonBlockDiv>

          <MainSectionDiv>
            <TitleDiv>{title}</TitleDiv>
            <AuthorDiv>{author.username}</AuthorDiv>
            {createDateBlock}
            {updateDateBlock}
            <BodyDiv>{body}</BodyDiv>
            <div>{tags}</div>
            <LikeBlock className="btnLike">
              <ButtonLike className="btnLike">{btnLike}</ButtonLike>
              <LikeCount>{favoritesCount}</LikeCount>
            </LikeBlock>
          </MainSectionDiv>
        </ContainerDiv>
      </>
    );
  }
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
  padding: 10px;
`;

const AuthorDiv = styled.div`
  margin-bottom: 10px;
  padding: 10px;
`;

const CreateDateDiv = styled.div`
  margin-bottom: 10px;
  padding: 10px;
`;

const UpdateDateDiv = styled.div`
  margin-bottom: 10px;
  padding: 10px;
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleFullVersion);
