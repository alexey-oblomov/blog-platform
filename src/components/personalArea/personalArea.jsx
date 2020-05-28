import React, {Component} from 'react';
import styled from 'styled-components';
import {
  articlesLoaded,
  setAuthorized,
  showMode,
  getCurrentUserProfile,
  setCurrentMenuItem,
} from '../../redux/actions/actionCreators';
import axios from 'axios';
import {makeHeadersForAuth} from '../../utils/utils';
import {connect} from 'react-redux';
import {Button} from '@material-ui/core';

class PersonalArea extends Component {
  logout = () => {
    const {authorization, history, setCurrentUser, setShowMode} = this.props;
    authorization(false);
    localStorage.clear();
    setCurrentUser({});
    setShowMode('');
    history.push('/blog-platform/login');
  };

  getAllArticles = () => {
    const {setShowMode, history, setCurrentMenuItem} = this.props;
    const headers = makeHeadersForAuth();
    const {articlesLoaded} = this.props;
    setShowMode('');
    axios
      .get('https://conduit.productionready.io/api/articles?limit=9', {headers})
      .then(response => {
        const {articles, articlesCount} = response.data;
        articlesLoaded(articles, articlesCount);
        setCurrentMenuItem('showAllArticles');
        history.push('/blog-platform');
      });
  };

  getMyArticles = () => {
    const {setShowMode, currentUser, history, setCurrentMenuItem} = this.props;
    const {username} = currentUser;
    const headers = makeHeadersForAuth();
    const {articlesLoaded} = this.props;
    setShowMode(currentUser.username);
    axios
      .get(`https://conduit.productionready.io/api/articles?limit=9&author=${username}`, {
        headers,
      })
      .then(response => {
        const {articles, articlesCount} = response.data;
        articlesLoaded(articles, articlesCount);
        history.push('/blog-platform');
        setCurrentMenuItem('showMyArticles');
      });
  };

  addArticle = () => {
    const {history, setCurrentMenuItem} = this.props;
    setCurrentMenuItem('addArticle');
    history.push('/blog-platform/add');
  };

  getProfileUser = async () => {
    const {setCurrentUser} = this.props;
    const headers = makeHeadersForAuth();
    await axios
      .get(`https://conduit.productionready.io/api/user`, {
        headers,
      })
      .then(response => {
        const {user} = response.data;
        setCurrentUser(user);
      });
  };

  componentDidMount() {
    this.getProfileUser();
  }

  render() {
    const {currentMenuItem} = this.props;
    const notActiveStyle = {width: '275px', marginBottom: '7px'};
    const activeStyle = {
      border: '1px solid gray',
      boxShadow: '0 0 4px 0 #34495e',
      width: '275px',
      marginBottom: '7px',
    };
    let {image, username, email, bio} = this.props.currentUser;
    if (image === null) {
      image = 'https://static.productionready.io/images/smiley-cyrus.jpg';
    }
    if (bio === null) {
      bio = 'Хороший тамада, провожу интересные конкурсы';
    }
    return (
      <div
        style={{
          minHeight: '800px',
          border: '1px solid gray',
          borderRadius: '10px',
          boxShadow: '0 0 6px 0 #34495e',
          padding: '12px',
          maxWidth: '300px',
          margin: '5px',
          marginRight: '15px',
          marginTop: '6px',
        }}
      >
        <div
          style={{
            width: '275px',
            marginBottom: '5px',
            textAlign: 'center',
          }}
        >
          Личный кабинет
        </div>
        <div
          style={{
            border: '1px solid gray',
            borderRadius: '10px',
            padding: '12px',
            marginBottom: '30px',
            marginTop: '15px',
            backgroundColor: '#e0e0e0',
          }}
        >
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex'}}>
              <div>
                <img
                  src={image}
                  alt=""
                  style={{
                    display: 'block',
                    backgroundColor: 'white',
                    width: '100px',
                    height: '100px',
                    borderRadius: '10px',
                    marginBottom: '5px',
                  }}
                />
              </div>
              <div style={{padding: '10px', paddingTop: '5px'}}>
                <div style={{marginBottom: '10px'}}>
                  {username} ({email})
                </div>
              </div>
            </div>
            <div style={{padding: '8px'}}>"{bio}"</div>
          </div>
        </div>

        <WrapperDiv>
          <Button
            variant="contained"
            size="small"
            onClick={this.getAllArticles}
            className="active"
            style={currentMenuItem === 'showAllArticles' ? activeStyle : notActiveStyle}
          >
            Показать все статьи
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={this.getMyArticles}
            style={currentMenuItem === 'showMyArticles' ? activeStyle : notActiveStyle}
          >
            Показать все мои статьи
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={this.addArticle}
            style={currentMenuItem === 'addArticle' ? activeStyle : notActiveStyle}
          >
            Добавить статью
          </Button>

          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={this.logout}
            style={{
              width: '275px',
              marginBottom: '5px',
            }}
          >
            Выход
          </Button>
        </WrapperDiv>
      </div>
    );
  }
}

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const mapStateToProps = state => {
  const {articles, articlesCount, autorized, showMode, currentUser, currentMenuItem} = state;
  return {
    articles,
    articlesCount,
    autorized,
    showMode,
    currentUser,
    currentMenuItem,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    articlesLoaded: (articles, articlesCount) => dispatch(articlesLoaded(articles, articlesCount)),
    authorization: auth => dispatch(setAuthorized(auth)),
    setShowMode: user => dispatch(showMode(user)),
    setCurrentUser: currentUser => dispatch(getCurrentUserProfile(currentUser)),
    setCurrentMenuItem: currentMenuItem => dispatch(setCurrentMenuItem(currentMenuItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalArea);
