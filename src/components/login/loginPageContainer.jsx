import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {LoginForm} from '../forms/loginForm';
import {ListArticles} from '../listArticles';

function LoginPageContainer(props) {
  const {history, isAuthorized} = props;
  if (isAuthorized) {
    history.push('/blog-platform');
  }

  const leftBlock = isAuthorized ? null : <LoginForm history={history} />;
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

export default connect(mapStateToProps)(LoginPageContainer);

const WrapDiv = styled.div`
  display: flex;
  margin-bottom: 15px;
  margin-top: 20px;
`;
