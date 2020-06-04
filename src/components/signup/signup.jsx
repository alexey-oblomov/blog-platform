import React from 'react';

import {connect} from 'react-redux';
import styled from 'styled-components';

import SignupForm from './signupForm.jsx';
import ListArticles from '../listArticles/listArticles.jsx';

function Signup(props) {
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
  const {isAuthorized} = state;
  return {
    isAuthorized,
  };
}

export default connect(mapStateToProps)(Signup);

const WrapDiv = styled.div`
  display: flex;
  margin-bottom: 15px;
  margin-top: 20px;
`;
