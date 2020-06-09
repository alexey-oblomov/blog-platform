import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {uniqueId} from 'lodash';

import {articlesLoaded, setCurrentPage} from '../../redux/actions/actionCreators';
import {loadArticle, likeIt, unLikeIt, deleteArticleFromServer} from '../../services/serverApi';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Button} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

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

  getArticleFromServer = async headers => {
    const {slug} = this.props;
    const response = await loadArticle(slug, headers);
    const {article} = await response.data;
    this.setState({
      article,
    });
  };

  toggleLike = (favorited, authHeaders) => {
    if (favorited) {
      this.setUnlike(authHeaders);
    } else {
      this.setLike(authHeaders);
    }
  };

  setLike = async headers => {
    const {slug} = this.props;
    const response = await likeIt(slug, headers);
    const {article} = response.data;
    this.setState({
      article,
    });
  };

  setUnlike = async headers => {
    const {slug} = this.props;
    const response = await unLikeIt(slug, headers);
    const {article} = response.data;
    this.setState({
      article,
    });
  };

  toEdit = () => {
    const {slug, history} = this.props;
    history.push(`/blog-platform/articles/${slug}/edit`);
  };

  deleteArticle = async () => {
    const {slug, history, setArticlesToState} = this.props;
    const response = await deleteArticleFromServer(slug);
    if (response.status === 200) {
      await setArticlesToState([], 0);
      history.push('/blog-platform');
    }
  };

  componentDidMount() {
    const {setCurrentPage} = this.props;
    this.getArticleFromServer();
    setCurrentPage('');
  }

  render() {
    const {isAuthorized, currentUser} = this.props;
    let {title, author, body, tagList, favorited, favoritesCount} = this.state.article;
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
          <Button variant="contained" size="small" onClick={this.deleteArticle}>
            Удалить
          </Button>
        </ButtonDiv>
      ) : null;

    const btnLike = isAuthorized ? (
      favorited ? (
        <FavoriteIcon
          className="btnLike"
          alt="like"
          color="primary"
          style={{fontSize: 30}}
          onClick={event => this.toggleLike(favorited)}
        />
      ) : (
        <FavoriteBorderIcon
          className="btnLike"
          color="primary"
          style={{fontSize: 30}}
          onClick={event => this.toggleLike(favorited)}
        />
      )
    ) : (
      <FavoriteBorderIcon color="primary" className="btnLike" alt="like" />
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
  const {isAuthorized, currentUser} = state;
  return {
    isAuthorized,
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleFullVersion);
