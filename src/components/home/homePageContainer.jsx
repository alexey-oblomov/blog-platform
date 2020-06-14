import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {PersonalArea} from '../personalArea';
import {ListArticles} from '../listArticles';

function HomePageContainer(props) {
  const {history, isAuthorized} = props;
  if (!isAuthorized) {
    history.push('/blog-platform/login');
  }

  const leftBlock = isAuthorized ? <PersonalArea history={history} /> : null;
  const mainBlock = <ListArticles history={history} />;

  return (
    <WrapDiv>
      {leftBlock}
      {mainBlock}
    </WrapDiv>
  );
}

const WrapDiv = styled.div`
  display: flex;
  margin-bottom: 15px;
  margin-top: 20px;
  min-height: 800px;
`;

function mapStateToProps(state) {
  const {isAuthorized} = state.currentUser;
  return {
    isAuthorized,
  };
}

export default connect(mapStateToProps)(HomePageContainer);
