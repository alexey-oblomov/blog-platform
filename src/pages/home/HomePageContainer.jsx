import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {withAuth} from '../../services/hocs';
import {LoginForm} from '../../components/forms/loginForm';
import {PersonalArea} from '../../components/personalArea';
import {ListArticles} from '../../components/listArticles';

function HomePageContainer(props) {
  const {history, isAuthorized} = props;
  if (!isAuthorized) {
    history.push('/blog-platform/login');
  }

  const SideBar = withAuth(PersonalArea, LoginForm);

  return (
    <WrapDiv>
      <SideBar history={history} />
      <ListArticles history={history} />
    </WrapDiv>
  );
}

const mapStateToProps = state => {
  const {isAuthorized} = state.currentUser;
  return {isAuthorized};
};

export default connect(mapStateToProps)(HomePageContainer);

const WrapDiv = styled.div`
  display: flex;
  margin-bottom: 15px;
  margin-top: 20px;
  min-height: 800px;
`;
