import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {Formik, Form, Field, FieldArray} from 'formik';
import * as Yup from 'yup';
import {uniqueId} from 'lodash';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import {
  makeHeadersForAuth,
  deleteArticleFromServer,
  updateArticle,
  loadArticle,
} from '../../services/api';
import {articlesLoaded, setCurrentPage} from '../../redux/actions/actionCreators';

const SignUpSchema = Yup.object().shape({
  title: Yup.string().required('Обязательное поле'),
  description: Yup.string().required('Обязательное поле'),
  body: Yup.string().required('Обязательное поле'),
});

class EditForm extends Component {
  state = {
    article: {
      title: '',
      description: '',
      tagList: [],
      body: '',
      author: {username: ''},
    },
  };

  getArticleFromServer = async headers => {
    const {slug} = this.props;
    const response = await loadArticle(slug, headers);
    const {article} = await response.data;
    this.setState({
      article,
    });
  };

  handleSubmit = async values => {
    const {slug, history, setArticlesToStore} = this.props;
    const headers = makeHeadersForAuth();
    const {title, description, body, tagList} = values;
    const updArticle = {
      article: {title, description, body, tagList},
    };
    await updateArticle(slug, updArticle, headers);
    await setArticlesToStore([], 0);
    history.push('/blog-platform/');
  };

  deleteArticle = async () => {
    const {slug, history, setArticlesToStore} = this.props;
    const authHeaders = makeHeadersForAuth();
    const response = await deleteArticleFromServer(slug, authHeaders);
    if (response.status === 200) {
      await setArticlesToStore([], 0);
      history.push('/blog-platform');
    }
  };

  componentDidMount() {
    const {setCurrentPage, isAuthorized} = this.props;
    const authHeaders = isAuthorized ? makeHeadersForAuth() : null;
    this.getArticleFromServer(authHeaders);
    setCurrentPage('');
  }

  render() {
    const {article} = this.state;
    const {title, description, body, tagList} = article;
    const initialValues = {
      title,
      description,
      body,
      tagList,
    };

    return (
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validationSchema={SignUpSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          dirty,
          isValid,
          setFieldValue,
          setValues,
        }) => {
          const inputTitleProps = {
            size: 'small',
            name: 'title',
            as: 'input',
            component: TextField,
            label: 'Название статьи',
            variant: 'outlined',
            error: errors.title,
            initialvalue: initialValues.title,
            value: values.title,
            onChange: handleChange('title'),
            onBlur: handleBlur('title'),
            width: 225,
            required: true,
          };

          const inputDescriptionProps = {
            size: 'small',
            name: 'description',
            as: 'input',
            component: TextField,
            label: 'Краткое описание',
            variant: 'outlined',
            error: errors.description,
            value: values.description,
            onChange: handleChange('description'),
            onBlur: handleBlur('description'),
            width: '225',
          };

          const inputTagProps = {
            size: 'small',
            name: 'tag',
            as: 'input',
            component: TextField,
            label: 'Тег',
            variant: 'outlined',
            error: touched.tag && Boolean(errors.tag),
            value: values.tag,
            onChange: handleChange('tag'),
            onBlur: handleBlur('tag'),
            width: '225',
          };

          const inputBodyProps = {
            size: 'small',
            name: 'body',
            as: 'input',
            component: TextField,
            label: 'Текст статьи',
            variant: 'outlined',
            error: errors.body,
            value: values.body,
            onChange: handleChange('body'),
            onBlur: handleBlur('body'),
            rows: '10',
            width: '225',
            required: true,
          };

          const buttonAddTagProps = {
            variant: 'contained',
            size: 'small',
            color: 'secondary',
            onClick: () => {
              if (values.tag.trim()) {
                values.tagList.push(values.tag);
                setFieldValue('tag', '');
              }
            },
          };

          const buttonAddArticleProps = {
            variant: 'contained',
            size: 'small',
            color: 'primary',
            disabled: !dirty || !isValid,
            type: 'submit',
          };

          const buttonDeleteArticleProps = {
            variant: 'contained',
            size: 'small',
            onClick: this.deleteArticle,
          };

          const paperStyle = {
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            listStyle: 'none',
            minHeight: '45px',
          };

          const paperProps = {
            component: 'ul',
            elevation: 0,
            style: paperStyle,
          };

          const chipStyle = {maxWidth: '120px', overflow: 'hidden'};
          const liStyle = {margin: '5px'};

          return (
            <ContainerDiv>
              <HeadingDiv>Редактировать статью</HeadingDiv>
              <Form>
                <WrapperDiv>
                  <InputDiv>
                    <Field {...inputTitleProps} />
                    <ErrorDiv>{touched.title ? errors.title : ''}</ErrorDiv>
                  </InputDiv>

                  <InputDiv>
                    <Field {...inputDescriptionProps} />
                    <ErrorDiv>{touched.description ? errors.description : ''}</ErrorDiv>
                  </InputDiv>

                  <InputDiv>
                    <Field {...inputTagProps} />
                    <ButtonBlockDiv>
                      <Button {...buttonAddTagProps}>Добавить тег</Button>
                    </ButtonBlockDiv>
                  </InputDiv>

                  <FieldArray
                    name="tagList"
                    render={() => (
                      <TagsListDiv>
                        <Paper {...paperProps}>
                          {values.tagList.map(tag => {
                            return (
                              <li key={uniqueId()} style={liStyle}>
                                <Chip
                                  label={tag}
                                  onDelete={() => {
                                    setValues({
                                      ...values,
                                      tagList: values.tagList.filter(item => item !== tag),
                                    });
                                  }}
                                  style={chipStyle}
                                />
                              </li>
                            );
                          })}
                        </Paper>
                      </TagsListDiv>
                    )}
                  />
                  {touched.tagList ? errors.tagList : ''}

                  <InputTextDiv>
                    <TextareaAutosize {...inputBodyProps} />
                    <ErrorDiv>{touched.body ? errors.body : ''}</ErrorDiv>
                  </InputTextDiv>

                  <ButtonBlockDiv>
                    <ButtonDiv>
                      <Button {...buttonAddArticleProps}>Редактировать</Button>
                    </ButtonDiv>
                    <ButtonDiv>
                      <Button {...buttonDeleteArticleProps}>Удалить статью</Button>
                    </ButtonDiv>
                  </ButtonBlockDiv>
                </WrapperDiv>
              </Form>
            </ContainerDiv>
          );
        }}
      </Formik>
    );
  }
}

const ContainerDiv = styled.div`
  max-width: 1600px;
  min-height: 800px;
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 0 0 6px 0 #34495e;
  padding: 12px;
  min-width: 800px;
  margin: 5px;
  margin-right: 15px;
`;
const HeadingDiv = styled.div`
  text-align: center;
  font-size: 22px;
  margin-bottom: 15px;
`;

const WrapperDiv = styled.div`
  text-align: left;
`;

const InputDiv = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const InputTextDiv = styled.div`
  margin-bottom: 15px;
`;

const ErrorDiv = styled.div`
  height: 7px;
  color: red;
  padding-left: 10px;
`;

const TagsListDiv = styled.div`
  padding: '0';
`;

const ButtonBlockDiv = styled.div`
  display: flex;
  margin-left: 10px;
`;

const ButtonDiv = styled.div`
  margin: 10px;
`;

const mapStateToProps = state => {
  const {isAuthorized, currentUser} = state;
  return {
    isAuthorized,
    currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setArticlesToStore: (listArticles, articlesCount) =>
      dispatch(articlesLoaded(listArticles, articlesCount)),
    setCurrentPage: page => dispatch(setCurrentPage(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
