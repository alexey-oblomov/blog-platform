import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {makeHeadersForAuth, isAuth} from '../../utils/utils';
import {differenceInMinutes} from 'date-fns';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';

class Preview extends Component {
  state = {
    article: {
      author: {username: ''},
    },
  };

  getArticleFromServer = () => {
    const {slug} = this.props;
    axios.get(`https://conduit.productionready.io/api/articles/${slug}`).then(response => {
      this.setState({
        article: response.data.article,
      });
    });

    const auth = isAuth();
    if (auth) {
      const headers = makeHeadersForAuth();
      axios
        .get(`https://conduit.productionready.io/api/articles/${slug}`, {headers})
        .then(response => {
          this.setState({
            article: response.data.article,
          });
        });
    } else {
      axios.get(`https://conduit.productionready.io/api/articles/${slug}`).then(response => {
        this.setState({
          article: response.data.article,
        });
      });
    }
  };

  setLike = async slug => {
    const headers = makeHeadersForAuth();
    await axios
      .post(`https://conduit.productionready.io/api/articles/${slug}/favorite`, null, {headers})
      .then(response => {
        this.setState({
          article: response.data.article,
        });
      });
  };

  setUnlike = async slug => {
    const headers = makeHeadersForAuth();
    await axios
      .delete(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
        headers,
      })
      .then(response => {
        this.setState({
          article: response.data.article,
        });
      });
  };

  toggleLike = (event, slug, favorited) => {
    if (!favorited) {
      this.setLike(slug);
    } else {
      this.setUnlike(slug);
    }
  };

  componentDidMount() {
    this.getArticleFromServer();
  }

  render() {
    const {slug, currentUser} = this.props;
    const {article} = this.state;
    const {title, author, tagList, favoritesCount, createdAt, updatedAt, favorited} = article;
    const linkPath = `/blog-platform/articles/${slug}`;
    const auth = isAuth();
    const isModifed = createdAt === updatedAt ? false : true;
    const updateDate = isModifed ? (
      <div>Изменено: {differenceInMinutes(new Date(), new Date(updatedAt))} минут назад</div>
    ) : null;

    const btnLike = auth ? (
      favorited ? (
        <Tooltip title="Убрать лайк">
          <FavoriteIcon
            color="primary"
            className="btnLike"
            alt="like"
            onClick={event => this.toggleLike(event, slug, favorited)}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Поставить лайк">
          <FavoriteBorderIcon
            color="primary"
            className="btnLike"
            onClick={event => this.toggleLike(event, slug, favorited)}
          />
        </Tooltip>
      )
    ) : (
      <Tooltip title="Для возможности лайкать необходимо авторизоваться">
        <FavoriteBorderIcon className="btnLike" onClick={() => console.log('Нельзя лайкать!')} />
      </Tooltip>
    );

    const btnDelete =
      auth && currentUser.username === author.username ? (
        <DeleteDiv>
          <Tooltip title="Удалить статью">
            <HighlightOffIcon style={{fontSize: 30}} />
          </Tooltip>
        </DeleteDiv>
      ) : null;

    return (
      <PreviewDiv>
        <div
          style={{
            backgroundColor: '#3f51b5',
            color: 'white',
            borderRadius: '10px',
            marginBottom: '5px',
            padding: '10px 15px',
            textAlign: 'center',
            display: 'flex',
            height: '77px',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              flexGrow: '1',
            }}
          >
            {title}
          </div>

          {btnDelete}
        </div>

        <div
          style={{
            border: '1px solid gray',
            borderRadius: '10px',
            padding: '12px',
            backgroundColor: '#e0e0e0',
          }}
        >
          <Tooltip title="Перейти на страницу автора">
            <AuthorDiv>{author.username}</AuthorDiv>
          </Tooltip>
          <CreatedAtDiv>
            {differenceInMinutes(new Date(), new Date(createdAt))} минут назад
          </CreatedAtDiv>
          <UpdateAtDiv>{updateDate}</UpdateAtDiv>
        </div>

        <div
          className="tagsList"
          style={{
            padding: '5px 0 70px 5px',
            marginBottom: '5px',
            overflowWrap: 'break-word',
            overflow: 'auto',
          }}
        >
          {tagList} &nbsp;
        </div>

        <div style={{paddingTop: '5px', display: 'flex'}}>
          <div
            style={{
              border: '1px solid gray',
              borderRadius: '10px',
              padding: '5px',
              display: 'flex',
              width: '100%',
              backgroundColor: '#e0e0e0',
            }}
          >
            <div style={{display: 'flex', textAlign: 'left', flexGrow: '1'}}>
              <div className="btnLike" style={{marginRight: '5px'}}>
                {btnLike}
              </div>
              <div style={{color: '#3f51b5', fontSize: '18px', paddingTop: '1px'}}>
                {favoritesCount}
              </div>
            </div>
            <div style={{flexGrow: '1', textAlign: 'right'}}>
              <Link to={linkPath} style={{color: '#3a3833', fontSize: '14px'}}>
                читать дальше >>
              </Link>
            </div>
          </div>
        </div>
      </PreviewDiv>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.articles,
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(Preview);

const PreviewDiv = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 0 0 6px 0 #34495e;
  padding: 5px;
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

const DeleteDiv = styled.div`
  text-align: right;
  &:hover {
    transform: scale(1.1);
  }
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
