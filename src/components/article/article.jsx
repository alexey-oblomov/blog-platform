import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import PersonalArea from '../personalArea/personalArea.jsx';
import LoginForm from '../login/loginForm.jsx';
import ArticleFullVersion from './articleFullVersion';

function ArticlePage(props) {
  const {slug} = props.match.params;
  const {history, isAuthorized} = props;

  const propsArticleFullVersion = {
    history,
    slug,
  };
  const leftBlock = isAuthorized ? (
    <PersonalArea history={history} />
  ) : (
    <LoginForm history={history} />
  );
  const mainBlock = <ArticleFullVersion {...propsArticleFullVersion} />;

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

const WrapDiv = styled.div`
  display: flex;
  margin-bottom: 15px;
  margin-top: 20px;
  min-height: 800px;
`;

export default connect(mapStateToProps)(ArticlePage);
