import React from 'react';
import styled from 'styled-components';

import {connect} from 'react-redux';
import {Button} from '@material-ui/core';

import {setFilterByAuthor} from '../../redux/actions/articles/createActions.js';
import {
  setCurrentUserProfile,
  setAuthorized,
} from '../../redux/actions/currentUser/createActions.js';

import {baseRoutePath, defaultAvatarUrl} from '../../services/paths.js';

function PersonalArea(props) {
  const handleLogout = () => {
    const {authorization, history, setCurrentUser} = props;
    authorization({isAuthorized: false});
    localStorage.clear();
    setCurrentUser({currentUser: {}});
    history.push(`${baseRoutePath}/login`);
  };

  const getAllArticles = async () => {
    const {setFilterByAuthor, history} = props;
    const filterByAuthor = '';
    await setFilterByAuthor({filterByAuthor});
    history.push(`${baseRoutePath}/login`);
  };

  const getMyArticles = async () => {
    const {setFilterByAuthor, currentUser, history} = props;
    const {username} = currentUser;
    await setFilterByAuthor({filterByAuthor: username});
    history.push(`${baseRoutePath}/login`);
  };

  const handleCreateArticle = () => {
    const {history} = props;
    history.push(`${baseRoutePath}/add`);
  };

  const {currentMenuItem} = props;
  const notActiveStyle = {width: '275px', marginBottom: '7px'};
  const activeStyle = {
    border: '1px solid gray',
    boxShadow: '0 0 4px 0 #34495e',
    width: '275px',
    marginBottom: '7px',
  };
  const {image, username, email, bio} = props.currentUser;
  const avatarImage = image === null ? defaultAvatarUrl : image;
  const info = bio === null ? '--' : bio;
  return (
    <ContainerDiv>
      <HeadingDiv>Личный кабинет</HeadingDiv>
      <UserInfoBlock>
        <UserInfoMainSection>
          <UserImg src={avatarImage} alt="" />
          <UserNameAndEmailBlock>
            <div>{username}</div>
            <div>({email})</div>
          </UserNameAndEmailBlock>
        </UserInfoMainSection>
        <UserBioDiv>Информация: {info}</UserBioDiv>
      </UserInfoBlock>

      <ButtonBlockiv>
        <Button
          variant="contained"
          size="small"
          onClick={getAllArticles}
          className="active"
          style={currentMenuItem === 'showAllArticles' ? activeStyle : notActiveStyle}
        >
          Показать все статьи
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={getMyArticles}
          style={currentMenuItem === 'showMyArticles' ? activeStyle : notActiveStyle}
        >
          Показать все мои статьи
        </Button>

        <Button
          variant="contained"
          size="small"
          onClick={handleCreateArticle}
          style={currentMenuItem === 'createArticle' ? activeStyle : notActiveStyle}
        >
          Добавить статью
        </Button>

        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleLogout}
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

const mapStateToProps = state => {
  const {articles, currentUser: user, personalArea} = state;
  const {showQuantity, filterByAuthor} = articles;
  const {currentUser} = user;
  const {currentMenuItem} = personalArea;

  return {
    showQuantity,
    currentUser,
    filterByAuthor,
    currentMenuItem,
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
  word-break: break-all;
`;

const ButtonBlockiv = styled.div`
  display: flex;
  flex-direction: column;
`;
