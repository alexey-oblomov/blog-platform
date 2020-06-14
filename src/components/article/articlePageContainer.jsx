import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import {PersonalArea} from '../personalArea';
import LoginForm from '../forms/loginForm/loginForm.jsx';
import ArticlePage from './articlePage';

function ArticlePageContainer(props) {
  const {slug} = props.match.params;
  const {history, isAuthorized} = props;

  const propsArticlePage = {
    history,
    slug,
  };
  const leftBlock = isAuthorized ? (
    <PersonalArea history={history} />
  ) : (
    <LoginForm history={history} />
  );
  const mainBlock = <ArticlePage {...propsArticlePage} />;

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

const WrapDiv = styled.div`
  display: flex;
  margin-bottom: 15px;
  margin-top: 20px;
  min-height: 800px;
`;

export default connect(mapStateToProps)(ArticlePageContainer);
