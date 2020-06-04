import React, {Component} from 'react';
import styled from 'styled-components';
import {
  articlesLoaded,
  setAuthorized,
  showMode,
  setCurrentUserProfile,
  setCurrentMenuItem,
} from '../../redux/actions/actionCreators';
import {makeHeadersForAuth, getCurrentUser} from '../../utils/api';
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

  getAllArticles = async () => {
    const {setShowMode, history, setCurrentMenuItem} = this.props;
    setShowMode('');
    setCurrentMenuItem('showAllArticles');
    history.push('/blog-platform/login');
  };

  getMyArticles = async () => {
    const {setShowMode, currentUser, history, setCurrentMenuItem} = this.props;
    setShowMode(currentUser.username);
    setCurrentMenuItem('showMyArticles');
    history.push('/blog-platform/login');
  };

  addArticle = () => {
    const {history, setCurrentMenuItem} = this.props;
    setCurrentMenuItem('addArticle');
    history.push('/blog-platform/add');
  };

  getCurrentUserProfile = async () => {
    const {setCurrentUser} = this.props;
    const headers = makeHeadersForAuth();
    const response = await getCurrentUser(headers);
    const {user} = await response.data;
    setCurrentUser(user);
  };

  componentDidMount() {
    this.getCurrentUserProfile();
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
    const {image, username, email, bio} = this.props.currentUser;
    const avatarImage =
      image === null ? 'https://static.productionready.io/images/smiley-cyrus.jpg' : image;
    const info = bio === null ? 'Нет данных' : bio;
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
        </ButtonBlockiv>
      </ContainerDiv>
    );
  }
}

const mapStateToProps = state => {
  const {showQuantity, currentUser, currentMenuItem} = state;
  return {
    showQuantity,
    currentUser,
    currentMenuItem,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setArticlesToStore: (articles, articlesCount) =>
      dispatch(articlesLoaded(articles, articlesCount)),
    authorization: auth => dispatch(setAuthorized(auth)),
    setShowMode: user => dispatch(showMode(user)),
    setCurrentUser: currentUser => dispatch(setCurrentUserProfile(currentUser)),
    setCurrentMenuItem: currentMenuItem => dispatch(setCurrentMenuItem(currentMenuItem)),
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
