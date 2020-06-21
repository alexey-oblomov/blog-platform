import React from 'react';
import styled from 'styled-components';

import {withAuth} from '../../services/hocs';
import {PersonalArea} from '../../components/personalArea';
import {LoginForm} from '../../components/forms/loginForm';
import ArticlePage from '../../components/article/article';

function ArticlePageContainer(props) {
  const {slug} = props.match.params;
  const {history} = props;

  const propsArticlePage = {
    history,
    slug,
  };

  const SideBar = withAuth(PersonalArea, LoginForm);

  return (
    <WrapDiv>
      <SideBar history={history} />
      <ArticlePage {...propsArticlePage} />
    </WrapDiv>
  );
}

const WrapDiv = styled.div`
  display: flex;
  margin-bottom: 15px;
  margin-top: 20px;
  min-height: 800px;
`;

export {ArticlePageContainer};
