import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {withAuth} from '../../services/hocs';
import {PersonalArea} from '../../components/personalArea';
import {LoginForm} from '../../components/forms/loginForm';
import {CreateArticleForm} from '../../components/forms/createArticleForm';

function CreateArticlePageContainer(props) {
  const {history, isAuthorized} = props;
  if (!isAuthorized) {
    history.push('/blog-platform/login');
  }

  const SideBar = withAuth(PersonalArea, LoginForm);

  return (
    <WrapDiv>
      <SideBar history={history} />
      <CreateArticleForm history={history} />
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

export default connect(mapStateToProps)(CreateArticlePageContainer);
