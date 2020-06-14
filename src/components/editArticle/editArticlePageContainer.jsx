import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {PersonalArea} from '../personalArea';
import {EditArticleForm} from '../forms/editArticleForm';

function EditArticlePageContainer(props) {
  const {history, isAuthorized} = props;
  const {slug} = props.match.params;
  if (!isAuthorized) {
    history.push('/blog-platform/login');
  }

  const leftBlock = isAuthorized ? <PersonalArea history={history} /> : null;
  const mainBlock = <EditArticleForm history={history} slug={slug} />;

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

const mapStateToProps = state => {
  const {isAuthorized} = state.currentUser;
  return {
    isAuthorized,
  };
};

export default connect(mapStateToProps)(EditArticlePageContainer);
