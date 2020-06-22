import React, {useEffect} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import {Button} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import {setFilterByAuthor} from '../../redux/actions/articles/createActions.js';
import {setCurrentMenuItem} from '../../redux/actions/personalArea/createActions.js';
import {baseRoutePath, defaultAvatarUrl} from '../../services/paths.js';
import {loadAuthorProfile} from '../../redux/actions/authorProfile/createActions';

function AuthorProfile(props) {
  const handleGetUserArticles = username => {
    const {setFilterByAuthor, history, setCurrentMenuItem} = props;
    const filterByAuthor = username;
    setFilterByAuthor({filterByAuthor});
    setCurrentMenuItem('');
    history.push(baseRoutePath);
  };

  const getUserProfileFromServer = async () => {
    const {username, setAuthorProfileToStoreAsync} = props;
    await setAuthorProfileToStoreAsync(username);
  };

  useEffect(() => {
    const {setCurrentMenuItem} = props;
    getUserProfileFromServer();
    setCurrentMenuItem('');
  }, []);

  const {isLoading, profile} = props;
  let {username, image, following, bio} = profile;
  if (image === '') {
    image = defaultAvatarUrl;
  }
  const info = bio === null ? 'Нет данных' : bio;
  const isFollowing = following === false ? 'Нет' : 'Да';

  return (
    <ContainerDiv>
      <AuthorProfileWrapDiv>
        {isLoading ? (
          <SpinnerContainer>
            <CircularProgress />
          </SpinnerContainer>
        ) : (
          <>
            <HeadingDiv>Пользователь: {username}</HeadingDiv>
            <UserImg src={image} alt="" />
            <UserBioDiv>Информация: {info}</UserBioDiv>
            <UserFollowingDiv>Подписка: {isFollowing}</UserFollowingDiv>

            <ButtonDiv>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleGetUserArticles(username)}
              >
                Показать все статьи {username}
              </Button>
            </ButtonDiv>
          </>
        )}
      </AuthorProfileWrapDiv>
    </ContainerDiv>
  );
}

const mapStateToProps = ({currentUser, authorProfile}) => {
  const {isAuthorized} = currentUser;
  const {profile, isLoading} = authorProfile;
  return {
    isAuthorized,
    profile,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAuthorProfileToStoreAsync: author => dispatch(loadAuthorProfile(author)),
    setFilterByAuthor: user => dispatch(setFilterByAuthor(user)),
    setCurrentMenuItem: menuItem => dispatch(setCurrentMenuItem(menuItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorProfile);

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorProfileWrapDiv = styled.div`
  min-width: 820px;
  max-width: 950px;
  min-height: 800px;
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 0 0 6px 0 #34495e;
  padding: 12px;
  margin: 5px;
  margin-right: 15px;
`;

const SpinnerContainer = styled.div`
  display: flex;
  margin: auto;
  padding-top: 300px;
  align-content: center;
  justify-content: center;
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
