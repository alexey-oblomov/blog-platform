import React from 'react';

import {connect} from 'react-redux';
import styled from 'styled-components';

import {SignupForm} from '../forms/signupForm';
import {ListArticles} from '../listArticles';

function SignupPageContainer(props) {
  const {history, isAuthorized} = props;
  if (isAuthorized) {
    history.push('/blog-platform');
  }

  const leftBlock = isAuthorized ? null : <SignupForm history={history} />;
  const mainBlock = <ListArticles history={history} />;

  return (
    <WrapDiv>
      {leftBlock}
      {mainBlock}
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
