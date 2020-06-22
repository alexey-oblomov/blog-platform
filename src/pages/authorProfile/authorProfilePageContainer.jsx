import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import {withAuth} from '../../services/hocs';
import {LoginForm} from '../../components/forms/loginForm';
import {PersonalArea} from '../../components/personalArea';
import AuthorProfile from '../../components/authorProfile/authorProfile';

function AuthorProfilePageContainer(props) {
  const {username} = props.match.params;
  const {history} = props;

  const propsArticleUserProfile = {
    history,
    username,
  };

  const SideBar = withAuth(PersonalArea, LoginForm);

  return (
    <WrapDiv>
      <SideBar history={history} />
      <AuthorProfile {...propsArticleUserProfile} />
    </WrapDiv>
  );
}

function mapStateToProps(state) {
  const {isAuthorized} = state.currentUser;
  return {
    isAuthorized,
  };
}

const WrapDiv = styled.div`
  display: flex;
  margin-bottom: 15px;
  margin-top: 20px;
  min-height: 800px;
`;

export default connect(mapStateToProps)(AuthorProfilePageContainer);
