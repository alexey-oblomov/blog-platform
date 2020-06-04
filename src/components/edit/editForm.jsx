import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {uniqueId} from 'lodash';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import {makeHeadersForAuth, deleteArticleFromServer, updateArticle} from '../../utils/api';
import {articlesLoaded} from '../../redux/actions/actionCreators';

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

  addTag = tag => {
    const {article} = this.state;
    const {title, description, body, tagList} = article;
    tagList.push(tag);
    this.setState({
      article: {
        title,
        tagList,
        description,
        body,
      },
    });
  };

  handleDelete = itemToDelete => {
    const {article} = this.state;
    const {title, description, body, tagList} = article;
    const newTagsArr = tagList.filter(item => item !== itemToDelete);
    this.setState({
      article: {
        title,
        tagList: newTagsArr,
        description,
        body,
      },
    });
  };

  getArticleFromServer = async slug => {
    const response = await axios.get(`https://conduit.productionready.io/api/articles/${slug}`);
    const {article} = await response.data;
    this.setState({
      article,
    });
  };

  handleSubmit = async values => {
    const {slug = ''} = this.props;
    const headers = makeHeadersForAuth();
    const {tagList} = this.state.article;
    const {title, description, body} = values;
    const updArticle = {
      article: {title, description, body, tagList},
    };
    console.log('перед отправкой: ', updArticle);

    const response = await updateArticle(slug, updArticle, headers);
    console.log('response ', response.data);
    this.props.history.push('/blog-platform/');
  };

  deleteArticle = async () => {
    const {slug, history, setArticlesToState} = this.props;
    const authHeaders = makeHeadersForAuth();
    const response = await deleteArticleFromServer(slug, authHeaders);
    if (response.status === 200) {
      await setArticlesToState([], 0);
      history.push('/blog-platform');
    }
  };

  componentDidMount() {
    const {slug = ''} = this.props;
    this.getArticleFromServer(slug);
  }

  render() {
    const {article} = this.state;
    const {title, description, body, tagList} = article;
    const initialValues = {
      title,
      description,
      body,
      tags: tagList,
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
          initialValues,
          handleChange,
          handleBlur,
          errors,
          touched,
          dirty,
          isValid,
          setFieldValue,
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

          const inputTagsProps = {
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
                    <Field {...inputTagsProps} style={{marginRight: '15px'}} />
                    <ButtonBlockDiv>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => {
                          if (values.tag.trim()) {
                            this.addTag(values.tag);
                            setFieldValue('tag', '');
                          }
                        }}
                      >
                        Добавить тег
                      </Button>
                    </ButtonBlockDiv>
                  </InputDiv>
                  <TagsListDiv>
                    <Paper
                      component="ul"
                      className=""
                      elevation={0}
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        minHeight: '45px',
                      }}
                    >
                      {tagList.map(item => {
                        return (
                          <li key={uniqueId()} style={{margin: '5px'}}>
                            <Chip
                              label={item}
                              onDelete={() => this.handleDelete(item)}
                              style={{maxWidth: '120px', overflow: 'hidden'}}
                            />
                          </li>
                        );
                      })}
                    </Paper>
                  </TagsListDiv>
                  {touched.name ? errors.name : ''}

                  <InputTextDiv>
                    <TextareaAutosize {...inputBodyProps} />
                    <ErrorDiv>{touched.body ? errors.body : ''}</ErrorDiv>
                  </InputTextDiv>

                  <ButtonBlockDiv>
                    <ButtonDiv>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        disabled={!dirty || !isValid}
                        type="submit"
                      >
                        Редактировать
                      </Button>
                    </ButtonDiv>
                    <ButtonDiv>
                      <Button variant="contained" size="small" onClick={this.deleteArticle}>
                        Удалить статью
                      </Button>
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
`;
const ButtonDiv = styled.div`
  margin: 10px;
`;

const mapStateToProps = state => {
  const {currentUser} = state;
  return {
    currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setArticlesToState: (listArticles, articlesCount) =>
      dispatch(articlesLoaded(listArticles, articlesCount)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
