import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formatDistanceToNow} from 'date-fns';
import {ru} from 'date-fns/locale';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {uniqueId} from 'lodash';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';

import {articlesLoad} from '../../redux/actions/actionCreators';
import {
  favoriteArticleRequest,
  unfavoriteArticleRequest,
  deleteArticleRequest,
} from '../../services/serverApi';
import {baseRoutePath} from '../../services/paths.js';

class Preview extends Component {
  state = {
    article: {
      tagList: [],
      createdAt: '',
      updatedAt: '',
      author: {username: ''},
    },
  };

  getArticleFromStoreToState = () => {
    const {slug, listArticles} = this.props;
    if (listArticles) {
      const article = listArticles.find(item => item.slug === slug);
      this.setState({
        article,
      });
    } else return;
  };

  setFavorited = async slug => {
    const response = await favoriteArticleRequest(slug);
    const {article} = response.data;
    this.setState({
      article,
    });
  };

  setUnfavorited = async slug => {
    const response = await unfavoriteArticleRequest(slug);
    const {article} = response.data;
    this.setState({
      article,
    });
  };

  handleFavoriteChange = (slug, favorited) => {
    if (favorited) {
      this.setUnfavorited(slug);
    } else {
      this.setFavorited(slug);
    }
  };

  handleDeleteArticle = async slug => {
    const {history} = this.props;
    const response = await deleteArticleRequest(slug);
    if (response.status === 200) {
      history.push(`${baseRoutePath}/login`);
    }
  };

  toUserPage = user => {
    const {history} = this.props;
    history.push(`${baseRoutePath}/user/${user}`);
  };

  componentDidMount() {
    this.getArticleFromStoreToState();
  }

  render() {
    const {slug, currentUser, isAuthorized} = this.props;
    const {article} = this.state;
    const {title, author, tagList, favoritesCount, createdAt, updatedAt, favorited} = article;
    const linkPath = `${baseRoutePath}/articles/${slug}`;
    const isModifed = createdAt === updatedAt ? false : true;

    const tags = tagList.map(item => {
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
    });

    const getDistanceDateToNow = date => {
      if (date) {
        return formatDistanceToNow(new Date(date), {
          locale: ru,
        });
      }
      return;
    };

    const createdDataBlock = () => {
      if (createdAt) {
        return (
          <CreateAtBlock>
            <GreenStyledText>Создано: </GreenStyledText>
            <BlackStyledText>{getDistanceDateToNow(createdAt)} назад</BlackStyledText>
          </CreateAtBlock>
        );
      } else {
        return <Skeleton animation="wave" variant="text" />;
      }
    };

    const updatedDataBlock = () => {
      if (updatedAt) {
        if (isModifed) {
          return (
            <RedStyledText>
              Изменено:
              {getDistanceDateToNow(updatedAt)} назад
            </RedStyledText>
          );
        } else {
          return null;
        }
      } else {
        return <Skeleton animation="wave" variant="text" />;
      }
    };

    const btnLike = () => {
      if (isAuthorized) {
        if (favorited) {
          return (
            <Tooltip title="Убрать лайк">
              <FavoriteIcon
                color="primary"
                className="btnLike"
                alt="like"
                onClick={() => this.handleFavoriteChange(slug, favorited)}
              />
            </Tooltip>
          );
        } else {
          return (
            <Tooltip title="Поставить лайк">
              <FavoriteBorderIcon
                color="primary"
                className="btnLike"
                onClick={() => this.handleFavoriteChange(slug, favorited)}
              />
            </Tooltip>
          );
        }
      } else {
        return (
          <Tooltip title="Для возможности лайкать необходимо авторизоваться">
            <FavoriteBorderIcon className="btnLike" />
          </Tooltip>
        );
      }
    };

    const btnDelete = () => {
      if (isAuthorized && currentUser.username === author.username) {
        return (
          <DeleteDiv className="btnDelete">
            <Tooltip title="Удалить статью">
              <HighlightOffIcon
                className="btnDelete"
                style={{fontSize: 30}}
                onClick={() => this.handleDeleteArticle(slug)}
              />
            </Tooltip>
          </DeleteDiv>
        );
      } else {
        return null;
      }
    };

    return (
      <PreviewDiv>
        <HeaderDiv>
          {title ? (
            <>
              <TitleDiv>{title}</TitleDiv>
              <DeleteDiv>{btnDelete()}</DeleteDiv>
            </>
          ) : (
            <Skeleton animation="wave" variant="text" height={20} />
          )}
        </HeaderDiv>

        <MainBlockDiv>
          <Tooltip title="Перейти на страницу автора">
            {author.username ? (
              <AuthorDiv className="authorDiv" onClick={() => this.toUserPage(author.username)}>
                <GreenStyledText>Автор: </GreenStyledText>
                {author.username}
              </AuthorDiv>
            ) : (
              <Skeleton animation="wave" variant="text" />
            )}
          </Tooltip>
          <CreatedAndUpdateDataBlock>
            {createdDataBlock()}
            {updatedDataBlock()}
          </CreatedAndUpdateDataBlock>
        </MainBlockDiv>

        <TagListDiv>
          <Paper
            component="ul"
            elevation={0}
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              listStyle: 'none',
              margin: '0px',
              padding: '0',
            }}
          >
            {tags}
          </Paper>
        </TagListDiv>

        <FooterDiv>
          <LikeBlock className="btnLike">
            <ButtonLike className="btnLike">{btnLike()}</ButtonLike>
            <LikeCount>{favoritesCount}</LikeCount>
          </LikeBlock>
          <ReadMoreSpan>
            <Link to={linkPath} style={{color: '#3a3833', fontSize: '14px'}}>
              читать дальше &gt;&gt;
            </Link>
          </ReadMoreSpan>
        </FooterDiv>
      </PreviewDiv>
    );
  }
}

function mapStateToProps(state) {
  const {listArticles} = state.articles;
  const {currentUser, isAuthorized} = state.currentUser;

  return {
    listArticles,
    currentUser,
    isAuthorized,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setArticlesToState: (listArticles, articlesCount) =>
      dispatch(articlesLoad(listArticles, articlesCount)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);

const PreviewDiv = styled.div`
  width: 250px;
  height: 280px;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const HeaderDiv = styled.div`
  background-color: #3f51b5;
  color: white;
  border-radius: 10px;
  padding: 10px 15px;
  text-align: center;
  display: flex;
  margin-bottom: 5px;
  max-height: 80px;
`;

const TitleDiv = styled.div`
  text-align: center;
  flex-shrink: 0;
  flex-grow: 1;
  max-width: 190px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  overflow: hidden;
`;

const DeleteDiv = styled.div`
  text-align: right;
`;

const MainBlockDiv = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  padding: 7px;
  background-color: #e0e0e0;
  margin-bottom: 5px;
`;

const AuthorDiv = styled.div`
  color: #3a3833;
  font-size: 16px;
  margin-bottom: 3px;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const CreatedAndUpdateDataBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CreateAtBlock = styled.div`
  display: flex;
`;

const GreenStyledText = styled.span`
  font-weight: normal;
  color: green;
  font-size: 12px;
`;

const BlackStyledText = styled.span`
  color: #3a3833;
  font-size: 12px;
`;

const RedStyledText = styled.span`
  color: red;
  font-size: 12px;
`;

const TagListDiv = styled.div`
  overflow: auto;
  flex-grow: 1;
  margin-bottom: 5px;
`;

const FooterDiv = styled.div`
  display: flex;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 5px;
  background-color: #e0e0e0;
`;

const LikeBlock = styled.div`
  display: flex;
  text-align: left;
`;

const ButtonLike = styled.div`
  margin-right: 5px;
`;

const LikeCount = styled.div`
  color: #3f51b5;
  font-size: 18px;
  padding-top: 1px;
`;

const ReadMoreSpan = styled.span`
  display: block;
  flex-grow: 1;
  text-align: right;
`;
