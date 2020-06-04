import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import {setCurrentMenuItem, showMode} from '../../redux/actions/actionCreators';

import {makeHeadersForAuth, loadUserProfile} from '../../utils/api';

import {Button} from '@material-ui/core';

class UserProfile extends Component {
  state = {
    profile: {
      username: '',
      bio: '',
      image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      following: false,
    },
  };

  getUserArticles = async username => {
    const {setShowMode, history, setCurrentMenuItem} = this.props;
    setShowMode(username);
    setCurrentMenuItem('');
    history.push('/blog-platform');
  };

  getUserProfileFromServer = async headers => {
    const {username} = this.props;
    const response = await loadUserProfile(username, headers);
    const {profile} = await response.data;
    this.setState({
      profile,
    });
  };

  componentDidMount() {
    const {setCurrentMenuItem, isAuthorized} = this.props;
    const authHeaders = isAuthorized ? makeHeadersForAuth() : null;
    this.getUserProfileFromServer(authHeaders);
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
          <Button variant="contained" size="small" onClick={() => this.getUserArticles(username)}>
            Показать все статьи {username}
          </Button>
        </ButtonDiv>
      </ContainerDiv>
    );
  }
}

const mapStateToProps = state => {
  const {isAuthorized} = state;
  return {
    isAuthorized,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setShowMode: user => dispatch(showMode(user)),
    setCurrentMenuItem: value => dispatch(setCurrentMenuItem(value)),
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
