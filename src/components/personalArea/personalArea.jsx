import React, {Component} from 'react';
import styled from 'styled-components';

import {connect} from 'react-redux';
import {Button} from '@material-ui/core';

import {
  articlesLoad,
  setAuthorized,
  setFilterByAuthor,
  setCurrentUserProfile,
} from '../../redux/actions/actionCreators';
import {loadAllArticlesRequest, loadUserArticlesRequest} from '../../services/serverApi';
import {baseRoutePath, defaultAvatarUrl} from '../../services/paths.js';

class PersonalArea extends Component {
  getListArticles = async () => {
    const {filterByAuthor, showQuantity, setArticlesToStore} = this.props;
    if (filterByAuthor === '') {
      const response = await loadAllArticlesRequest(showQuantity);
      const {articles, articlesCount} = await response.data;
      setArticlesToStore(articles, articlesCount);
    } else {
      const response = await loadUserArticlesRequest(showQuantity, filterByAuthor);
      const {articles, articlesCount} = await response.data;
      setArticlesToStore(articles, articlesCount);
    }
  };

  handleLogout = () => {
    const {authorization, history, setCurrentUser} = this.props;
    authorization(false);
    localStorage.clear();
    setCurrentUser({});
    history.push(`${baseRoutePath}/login`);
  };

  getAllArticles = async () => {
    const {setFilterByAuthor, history} = this.props;
    await setFilterByAuthor('');
    await this.getListArticles();
    history.push(`${baseRoutePath}/login`);
  };

  getMyArticles = async () => {
    const {setFilterByAuthor, currentUser, history} = this.props;
    await setFilterByAuthor(currentUser.username);
    await this.getListArticles();
    history.push(`${baseRoutePath}/login`);
  };

  handleCreateArticle = () => {
    const {history} = this.props;
    history.push(`${baseRoutePath}/add`);
  };

  render() {
    const {currentMenuItem} = this.props;
    const notActiveStyle = {width: '275px', marginBottom: '7px'};
    const activeStyle = {
      border: '1px solid gray',
      boxShadow: '0 0 4px 0 #34495e',
      width: '275px',
      marginBottom: '7px',
    };
    const {image, username, email, bio} = this.props.currentUser;
    const avatarImage = image === null ? defaultAvatarUrl : image;
    const info = bio === null ? '--' : bio;
    return (
      <ContainerDiv>
        <HeadingDiv>Личный кабинет</HeadingDiv>
        <UserInfoBlock>
          <UserInfoMainSection>
            <UserImg src={avatarImage} alt="" />
            <UserNameAndEmailBlock>
              {username} ({email})
            </UserNameAndEmailBlock>
          </UserInfoMainSection>
          <UserBioDiv>Информация: {info}</UserBioDiv>
        </UserInfoBlock>

        <ButtonBlockiv>
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
            onClick={this.handleCreateArticle}
            style={currentMenuItem === 'createArticle' ? activeStyle : notActiveStyle}
          >
            Добавить статью
          </Button>

          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={this.handleLogout}
            style={{
              width: '275px',
              marginBottom: '5px',
            }}
          >
            Выход
          </Button>
        </ButtonBlockiv>
      </ContainerDiv>
    );
  }
}

const mapStateToProps = state => {
  const {showQuantity, filterByAuthor} = state.articles;
  const {currentUser} = state.currentUser;
  const {currentMenuItem} = state.personalArea;

  return {
    showQuantity,
    currentUser,
    filterByAuthor,
    currentMenuItem,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setArticlesToStore: (articles, articlesCount) =>
      dispatch(articlesLoad(articles, articlesCount)),
    authorization: auth => dispatch(setAuthorized(auth)),
    setFilterByAuthor: user => dispatch(setFilterByAuthor(user)),
    setCurrentUser: currentUser => dispatch(setCurrentUserProfile(currentUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalArea);

const ContainerDiv = styled.div`
  min-height: 800px;
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 0 0 6px 0 #34495e;
  padding: 12px;
  min-width: 300px;
  margin: 5px;
  margin-right: 15px;
  margin-top: 6px;
`;

const HeadingDiv = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const UserBioDiv = styled.div`
  padding: 8px;
`;

const UserInfoBlock = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 30px;
  margin-top: 15px;
  background-color: #e0e0e0;
  display: flex;
  flex-direction: column;
`;

const UserImg = styled.img`
  display: block;
  background-color: white;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-bottom: 5px;
`;

const UserInfoMainSection = styled.div`
  display: flex;
`;

const UserNameAndEmailBlock = styled.div`
  padding: 10px;
  padding-top: 5px;
  margin-bottom: 10px;
`;

const ButtonBlockiv = styled.div`
  display: flex;
  flex-direction: column;
`;
