import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import {Button} from '@material-ui/core';

import {setFilterByAuthor} from '../../redux/actions/articles/createActions.js';
import {setCurrentMenuItem} from '../../redux/actions/personalArea/createActions.js';
import {loadUserProfileRequest} from '../../services/serverApi';
import {baseRoutePath, defaultAvatarUrl} from '../../services/paths.js';
class UserProfile extends Component {
  state = {
    profile: {
      username: '',
      bio: '',
      image: defaultAvatarUrl,
      following: false,
    },
  };

  handleGetUserArticles = username => {
    const {setFilterByAuthor, history, setCurrentMenuItem} = this.props;
    const filterByAuthor = username;
    setFilterByAuthor({filterByAuthor});
    setCurrentMenuItem('');
    history.push(baseRoutePath);
  };

  getUserProfileFromServer = async () => {
    const {username} = this.props;
    const response = await loadUserProfileRequest(username);
    const {profile} = await response.data;
    this.setState({
      profile,
    });
  };

  componentDidMount() {
    const {setCurrentMenuItem} = this.props;
    this.getUserProfileFromServer();
    setCurrentMenuItem('');
  }

  render() {
    const {username, image, following, bio} = this.state.profile;
    const info = bio === null ? 'Нет данных' : bio;
    const isFollowing = following === false ? 'Нет' : 'Да';
    return (
      <ContainerDiv>
        <HeadingDiv>Пользователь: {username}</HeadingDiv>
        <UserImg src={image} alt="" />
        <UserBioDiv>Информация: {info}</UserBioDiv>
        <UserFollowingDiv>Подписка: {isFollowing}</UserFollowingDiv>

        <ButtonDiv>
          <Button
            variant="contained"
            size="small"
            onClick={() => this.handleGetUserArticles(username)}
          >
            Показать все статьи {username}
          </Button>
        </ButtonDiv>
      </ContainerDiv>
    );
  }
}

const mapStateToProps = state => {
  const {isAuthorized} = state.currentUser;
  return {
    isAuthorized,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilterByAuthor: user => dispatch(setFilterByAuthor(user)),
    setCurrentMenuItem: menuItem => dispatch(setCurrentMenuItem(menuItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

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

const HeadingDiv = styled.div`
  text-align: center;
  font-size: 22px;
  margin-bottom: 15px;
`;

const UserImg = styled.img`
  display: block;
  background-color: white;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-bottom: 5px;
`;

const UserBioDiv = styled.div`
  padding: 8px;
`;

const UserFollowingDiv = styled.div`
  padding: 8px;
`;

const ButtonDiv = styled.div`
  margin: 10px;
`;
