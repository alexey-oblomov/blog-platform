import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {currentArticleLoaded, setCurrentMenuItem} from '../../redux/actions/actionCreators';
import {makeHeadersForAuth} from '../../utils/utils';
import PersonalArea from '../personalArea/personalArea.jsx';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Button} from '@material-ui/core';

class Article extends Component {
  getArticleFromServer = () => {
    const {slug} = this.props.match.params;
    const headers = makeHeadersForAuth();
    axios
      .get(`https://conduit.productionready.io/api/articles/${slug}`, {headers})
      .then(response => {
        this.props.currentArticleLoaded(response.data.article);
      });
  };

  setLike = async () => {
    const {slug} = this.props.match.params;
    const headers = makeHeadersForAuth();
    await axios
      .post(`https://conduit.productionready.io/api/articles/${slug}/favorite`, null, {headers})
      .then(response => {
        this.props.currentArticleLoaded(response.data.article);
      });
  };

  componentDidMount() {
    const {setCurrentMenuItemNull, isAutorized} = this.props;
    if (isAutorized) {
      this.getArticleFromServer();
      setCurrentMenuItemNull('');
    }
  }
  setUnlike = async () => {
    const {slug} = this.props.match.params;
    const headers = makeHeadersForAuth();
    await axios
      .delete(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
        headers,
      })
      .then(response => {
        this.props.currentArticleLoaded(response.data.article);
      });
  };

  toggleLike = () => {
    const {currentArticle} = this.props;
    const {favorited} = currentArticle;
    if (!favorited) {
      this.setLike();
    } else {
      this.setUnlike();
    }
  };

  toEdit = () => {
    const {slug} = this.props.match.params;
    const {history} = this.props;
    history.push(`/blog-platform/articles/${slug}/edit`);
    // const linkToEdit = `/blog-platform/articles/${slug}/edit`;
  };

  render() {
    const {currentArticle, history, isAuthorized} = this.props;
    // const auth = isAuth();
    // if (!isAutorized) {
    //   history.push('/blog-platform/login');
    // }
    if (!isAuthorized) {
      console.log('isAutorized ', isAuthorized);
      history.push('/blog-platform/login');
    }
    const {slug} = this.props.match.params;
    let {title, author, body, favorited, favoritesCount} = currentArticle;
    const btnLike = favorited ? (
      <FavoriteIcon
        className="btnLike"
        alt="like"
        color="primary"
        style={{fontSize: 30}}
        onClick={event => this.toggleLike(event, slug, favorited)}
      />
    ) : (
      <FavoriteBorderIcon
        className="btnLike"
        color="primary"
        style={{fontSize: 30}}
        onClick={event => this.toggleLike(event, slug, favorited)}
      />
    );

    const leftAside = isAuthorized ? <PersonalArea history={history} /> : null;
    return (
      <>
        <br />

        <div style={{marginTop: '15px'}}>
          <div style={{display: 'flex', marginBottom: '15px'}}>
            {leftAside}

            <div
              style={{
                maxWidth: '1600px',
                minHeight: '800px',
                border: '1px solid gray',
                borderRadius: '10px',
                boxShadow: '0 0 6px 0 #34495e',
                padding: '12px',
                minWidth: '300px',
                margin: '5px',
                marginRight: '15px',
              }}
            >
              <div style={{display: 'flex'}}>
                <div style={{marginRight: '10px'}}>
                  <Button variant="contained" size="small" onClick={this.toEdit}>
                    Редактировать
                  </Button>
                </div>
                <div>
                  <Button variant="contained" size="small" onClick={() => console.log('клик!')}>
                    Удалить
                  </Button>
                </div>
              </div>

              <div>
                <h3>{title}</h3>
                <div style={{marginBottom: '10px'}}>{author.username}</div>
                <div style={{marginBottom: '10px', overflowWrap: 'break-word', maxWidth: '800px'}}>
                  {body}
                </div>
                <div className="btnLike" style={{display: 'flex', cursor: 'pointer'}}>
                  <div className="btnLike" style={{marginRight: '5px'}}>
                    {btnLike}
                  </div>
                  <div style={{color: '#3f51b5', fontSize: '25px'}}>{favoritesCount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentArticle: state.currentArticle,
    isAuthorized: state.isAuthorized,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    currentArticleLoaded: currentArticle => dispatch(currentArticleLoaded(currentArticle)),
    setCurrentMenuItemNull: currentMenuItem => dispatch(setCurrentMenuItem(currentMenuItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
