import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {uniqueId} from 'lodash';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

import {makeHeadersForAuth, createArticle} from '../../utils/api';

const SignUpSchema = Yup.object().shape({
  title: Yup.string().required('Обязательное поле'),
  description: Yup.string().required('Обязательное поле'),
  body: Yup.string().required('Обязательное поле'),
});

class AddForm extends Component {
  state = {
    tags: [],
  };

  addTag = tag => {
    const item = {key: uniqueId(), label: tag};
    const {tags} = this.state;
    tags.push(item);
    this.setState({
      tags,
    });
  };

  handleDelete = itemToDelete => {
    const newTagsArr = this.state.tags.filter(item => item.key !== itemToDelete.key);
    this.setState({
      tags: newTagsArr,
    });
  };

  handleSubmit = async values => {
    const headers = makeHeadersForAuth();
    const {title, description, body} = values;
    const {tags} = this.state;
    let tagList = [];
    tags.map(item => tagList.push(item.label));
    const newArticle = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };
    await createArticle(newArticle, headers);
    this.props.history.push('/blog-platform/');
  };

  render() {
    const initialValues = {
      title: '',
      description: '',
      body: '',
      tags: [],
    };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validationSchema={SignUpSchema}
      >
        {({values, handleChange, handleBlur, errors, touched, dirty, isValid, setFieldValue}) => {
          const inputTitleProps = {
            size: 'small',
            name: 'title',
            as: 'input',
            component: TextField,
            label: 'Название статьи',
            variant: 'outlined',
            error: touched.title && Boolean(errors.title),
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
            error: touched.description && Boolean(errors.description),
            value: values.description,
            onChange: handleChange('description'),
            onBlur: handleBlur('description'),
            required: true,
          };

          const inputTagsProps = {
            size: 'small',
            name: 'tag',
            as: 'input',
            component: TextField,
            label: 'Тег',
            variant: 'outlined',
            value: values.tag,
            onChange: handleChange('tag'),
            error: touched.tag && Boolean(errors.tag),
            onBlur: handleBlur('tag'),
          };

          const inputBodyProps = {
            size: 'small',
            name: 'body',
            as: 'input',
            component: TextField,
            label: 'Текст статьи',
            variant: 'outlined',
            value: values.body,
            onChange: handleChange('body'),
            onBlur: handleBlur('body'),
            rowsMin: '25',
            required: true,
          };
          return (
            <ContainerDiv>
              <HeadingDiv>Добавить статью</HeadingDiv>
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
                      {this.state.tags.map(item => {
                        return (
                          <li key={item.key} style={{margin: '5px'}}>
                            <Chip
                              label={item.label}
                              onDelete={() => this.handleDelete(item)}
                              style={{maxWidth: '120px', overflow: 'hidden'}}
                            />
                          </li>
                        );
                      })}
                    </Paper>
                  </TagsListDiv>
                  {touched.tags ? errors.tags : ''}

                  <InputTextDiv>
                    <TextareaAutosize {...inputBodyProps} />
                    <ErrorDiv>{touched.body ? errors.body : ''}</ErrorDiv>
                  </InputTextDiv>

                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    disabled={!dirty || !isValid}
                    type="submit"
                  >
                    Добавить статью
                  </Button>
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
  padding-left: 50px;
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

const ButtonBlockDiv = styled.div`
  display: flex;
`;

const TagsListDiv = styled.div`
  padding: '0';
`;

export default connect()(AddForm);
