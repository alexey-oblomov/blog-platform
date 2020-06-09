import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadArticle, likeIt, unLikeIt, deleteArticleFromServer} from '../../services/serverApi';

import {uniqueId} from 'lodash';
import {articlesLoaded} from '../../redux/actions/actionCreators';
import {differenceInMinutes, differenceInHours, differenceInDays} from 'date-fns';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';

class Preview extends Component {
  state = {
    article: {
      tagList: [],
      createdAt: '',
      updatedAt: '',
      author: {username: ''},
    },
  };

  getArticleFromServer = async headers => {
    try {
      const {slug} = this.props;
      const response = await loadArticle(slug, headers);
      if (response.status === 200) {
        const {article} = await response.data;
        this.setState({
          article,
        });
      }
    } catch (error) {
      console.log('error 404 ', error);
    }
  };

  toggleLike = (slug, favorited) => {
    if (favorited) {
      this.setUnlike(slug);
    } else {
      this.setLike(slug);
    }
  };

  setLike = async slug => {
    const response = await likeIt(slug);
    const {article} = response.data;
    this.setState({
      article,
    });
  };

  setUnlike = async slug => {
    const response = await unLikeIt(slug);
    const {article} = response.data;
    this.setState({
      article,
    });
  };

  toggleLike = (slug, favorited) => {
    if (favorited) {
      this.setUnlike(slug);
    } else {
      this.setLike(slug);
    }
  };

  deleteArticle = async slug => {
    const {history, setArticlesToState} = this.props;
    const response = await deleteArticleFromServer(slug);
    if (response.status === 200) {
      await setArticlesToState([], 0);
      history.push('/blog-platform/login');
    }
  };

  toUserPage = user => {
    const {history, setArticlesToState} = this.props;
    setArticlesToState([], 0);
    history.push(`/blog-platform/user/${user}`);
  };

  componentDidMount() {
    this.getArticleFromServer();
  }

  render() {
    const {slug, currentUser, isAuthorized} = this.props;
    const {article} = this.state;
    const {title, author, tagList, favoritesCount, createdAt, updatedAt, favorited} = article;
    const linkPath = `/blog-platform/articles/${slug}`;
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

    const diffDateCreate = date => {
      let minutes, hours, days;
      minutes = differenceInMinutes(new Date(), new Date(date));
      const showMinutes = minutes === 0 ? 'только что' : `${minutes} мин назад`;
      if (minutes >= 60) {
        hours = differenceInHours(new Date(), new Date(date));
        const showMinutes = minutes === 0 ? '' : `${minutes - hours * 60} мин`;
        if (hours >= 24) {
          days = differenceInDays(new Date(), new Date(date));
          const showDays = `${days} дн`;
          const showHours = hours === 0 && minutes === 0 ? '' : `${hours - days * 24} ч`;
          return `${showDays} ${showHours}  ${showMinutes} назад`;
        }
        return `${hours} ч ${showMinutes} назад`;
      }
      return `${showMinutes}`;
    };

    const createDate = diffDateCreate(createdAt);
    const updDate = diffDateCreate(updatedAt);

    const createdDate = createdAt ? (
      <div>
        <GreenTextStyle>Создано: </GreenTextStyle>
        {createDate}
      </div>
    ) : (
      <Skeleton animation="wave" variant="text" />
    );

    const updateDate = updatedAt ? (
      isModifed ? (
        <div>
          <UpdateDateSpan>Изменено:</UpdateDateSpan>
          {updDate}
        </div>
      ) : null
    ) : (
      <Skeleton animation="wave" variant="text" />
    );

    const btnLike = isAuthorized ? (
      favorited ? (
        <Tooltip title="Убрать лайк">
          <FavoriteIcon
            color="primary"
            className="btnLike"
            alt="like"
            onClick={() => this.toggleLike(slug, favorited)}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Поставить лайк">
          <FavoriteBorderIcon
            color="primary"
            className="btnLike"
            onClick={() => this.toggleLike(slug, favorited)}
          />
        </Tooltip>
      )
    ) : (
      <Tooltip title="Для возможности лайкать необходимо авторизоваться">
        <FavoriteBorderIcon className="btnLike" />
      </Tooltip>
    );

    const btnDelete =
      isAuthorized && currentUser.username === author.username ? (
        <DeleteDiv className="btnDelete">
          <Tooltip title="Удалить статью">
            <HighlightOffIcon
              className="btnDelete"
              style={{fontSize: 30}}
              onClick={() => this.deleteArticle(slug)}
            />
          </Tooltip>
        </DeleteDiv>
      ) : null;

    return (
      <PreviewDiv>
        <HeaderDiv>
          {title ? (
            <>
              <TitleDiv>{title}</TitleDiv>
              <DeleteDiv>{btnDelete}</DeleteDiv>
            </>
          ) : (
            <Skeleton animation="wave" variant="text" height={20} />
          )}
        </HeaderDiv>

        <MainBlockDiv>
          <Tooltip title="Перейти на страницу автора">
            {author.username ? (
              <AuthorDiv className="authorDiv" onClick={() => this.toUserPage(author.username)}>
                <GreenTextStyle>Автор: </GreenTextStyle>
                {author.username}
              </AuthorDiv>
            ) : (
              <Skeleton animation="wave" variant="text" />
            )}
          </Tooltip>
          <CreatedAtDiv>{createdDate}</CreatedAtDiv>
          <UpdateAtDiv>{updateDate}</UpdateAtDiv>
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
            <ButtonLike className="btnLike">{btnLike}</ButtonLike>
            <LikeCount>{favoritesCount}</LikeCount>
          </LikeBlock>
          <ReadMoreSpan>
            <Link to={linkPath} style={{color: '#3a3833', fontSize: '14px'}}>
              читать дальше >>
            </Link>
          </ReadMoreSpan>
        </FooterDiv>
      </PreviewDiv>
    );
  }
}

function mapStateToProps(state) {
  const {articles, currentUser, isAuthorized} = state;
  return {
    articles,
    currentUser,
    isAuthorized,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setArticlesToState: (listArticles, articlesCount) =>
      dispatch(articlesLoaded(listArticles, articlesCount)),
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
  &:hover {
    text-decoration: underline;
  }
`;

const CreatedAtDiv = styled.div`
  color: #3a3833;
  text-align: right;
  font-size: 15px;
`;

const UpdateAtDiv = styled.div`
  text-align: right;
  font-size: 15px;
  color: red;
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

const GreenTextStyle = styled.span`
  color: green;
  font-size: 12px;
`;

const UpdateDateSpan = styled.span`
  color: red;
  font-size: 12px;
`;
