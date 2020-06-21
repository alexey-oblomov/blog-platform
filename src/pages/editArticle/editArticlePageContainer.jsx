import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {withAuth} from '../../services/hocs';
import {PersonalArea} from '../../components/personalArea';
import {LoginForm} from '../../components/forms/loginForm';
import {EditArticleForm} from '../../components/forms/editArticleForm';

function EditArticlePageContainer(props) {
  const {history, isAuthorized} = props;
  const {slug} = props.match.params;
  if (!isAuthorized) {
    history.push('/blog-platform/login');
  }

  const SideBar = withAuth(PersonalArea, LoginForm);

  return (
    <WrapDiv>
      <SideBar history={history} />
      <EditArticleForm history={history} slug={slug} />
    </WrapDiv>
  );
}

const WrapDiv = styled.div`
  display: flex;
  margin-bottom: 15px;
  margin-top: 20px;
  min-height: 800px;
`;

const mapStateToProps = state => {
  const {isAuthorized} = state.currentUser;
  return {
    isAuthorized,
  };
};

export default connect(mapStateToProps)(EditArticlePageContainer);
