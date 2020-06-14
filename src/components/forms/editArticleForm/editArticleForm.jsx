import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {uniqueId} from 'lodash';

import {Formik, Form, Field, FieldArray} from 'formik';
import * as Yup from 'yup';

import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

import {deleteArticleRequest, updateArticleRequest} from '../../../services/serverApi';
import {articlesLoad, setCurrentMenuItem} from '../../../redux/actions/actionCreators';
import {baseRoutePath} from '../../../services/paths.js';

const SignUpSchema = Yup.object().shape({
  title: Yup.string().required('Обязательное поле'),
  description: Yup.string().required('Обязательное поле'),
  body: Yup.string().required('Обязательное поле'),
});

class EditArticleForm extends Component {
  state = {
    article: {
      title: '',
      description: '',
      tagList: [],
      body: '',
      author: {username: ''},
    },
  };

  getArticleFromStoreToState = async headers => {
    const {slug, listArticles} = this.props;
    if (listArticles) {
      const article = listArticles.find(item => item.slug === slug);
      this.setState({
        article,
      });
    } else return;
  };

  handleSubmit = async values => {
    const {slug, history} = this.props;
    const {title, description, body, tagList} = values;
    const updArticle = {
      article: {title, description, body, tagList},
    };
    await updateArticleRequest(slug, updArticle);
    history.push(baseRoutePath);
  };

  handleDeleteArticle = async () => {
    const {slug, history} = this.props;
    const response = await deleteArticleRequest(slug);
    if (response.status === 200) {
      history.push(baseRoutePath);
    }
  };

  componentDidMount() {
    const {setCurrentMenuItem} = this.props;
    this.getArticleFromStoreToState();
    setCurrentMenuItem('');
  }

  render() {
    const {article} = this.state;
    if (!article) {
      return null;
    }
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

          const buttonEditArticleProps = {
            variant: 'contained',
            size: 'small',
            color: 'primary',
            disabled: !dirty || !isValid,
            type: 'submit',
          };

          const buttonDeleteArticleProps = {
            variant: 'contained',
            size: 'small',
            onClick: this.handleDeleteArticle,
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
                      <Button {...buttonEditArticleProps}>Редактировать</Button>
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
  const {listArticles} = state.articles;
  const {isAuthorized, currentUser} = state.currentUser;

  return {
    isAuthorized,
    currentUser,
    listArticles,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setArticlesToStore: (listArticles, articlesCount) =>
      dispatch(articlesLoad(listArticles, articlesCount)),
    setCurrentMenuItem: page => dispatch(setCurrentMenuItem(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticleForm);
