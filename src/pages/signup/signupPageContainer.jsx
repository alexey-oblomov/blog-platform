import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {withAuth} from '../../services/hocs';
import {SignupForm} from '../../components/forms/signupForm';
import {PersonalArea} from '../../components/personalArea';
import {ListArticles} from '../../components/listArticles';

function SignupPageContainer(props) {
  const {history, isAuthorized} = props;
  if (isAuthorized) {
    history.push('/blog-platform');
  }

  const SideBar = withAuth(PersonalArea, SignupForm);

  return (
    <WrapDiv>
      <SideBar history={history} />
      <ListArticles history={history} />
    </WrapDiv>
  );
}

function mapStateToProps(state) {
  const {isAuthorized} = state.currentUser;
  return {
    isAuthorized,
  };
}

export default connect(mapStateToProps)(SignupPageContainer);

const WrapDiv = styled.div`
  display: flex;
  margin-bottom: 15px;
  margin-top: 20px;
`;
