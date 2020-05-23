import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PersonalArea from '../personalArea/personalArea.jsx';
import {Formik, Form, Field} from 'formik';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import {makeHeadersForAuth} from '../../utils/utils';

export function Add(props) {
  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: '',
  };

  const StyledButton = withStyles({
    root: {
      height: '28px',
      alignSelf: 'center',
      backgroundColor: '#1a73e8',
      color: 'white',
      marginLeft: '0',
    },
  })(Button);

  const handleSubmit = async values => {
    const headers = makeHeadersForAuth();
    const {title, description, body, tagList} = values;
    const newArticle = {
      article: {
        title: title,
        description: description,
        body: body,
        tagList: [tagList],
      },
    };
    await axios
      .post('https://conduit.productionready.io/api/articles', newArticle, {
        headers,
      })
      .then(response => console.log('response.data ', response.data));
    props.history.push('/blog-platform/');
  };

  return (
    <>
      <div style={{marginTop: '15px'}}>
        <div style={{display: 'flex', marginBottom: '15px'}}>
          <PersonalArea history={props.history} />

          <div
            style={{
              maxWidth: '1600px',
              minHeight: '800px',
              border: '1px solid gray',
              borderRadius: '10px',
              boxShadow: '0 0 6px 0 #34495e',
              padding: '12px',
              minWidth: '800px',
              margin: '5px',
              marginRight: '15px',
            }}
          >
            <div>
              <h1>Добавить статью</h1>
            </div>
            <div>
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({values, handleChange, handleBlur, errors, touched, dirty, isValid}) => {
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
                  };

                  const inputBodyProps = {
                    size: 'small',
                    name: 'body',
                    as: 'input',
                    component: TextField,
                    label: 'Текст статьи',
                    variant: 'outlined',
                    error: touched.body && Boolean(errors.body),
                    value: values.body,
                    onChange: handleChange('body'),
                    onBlur: handleBlur('body'),
                    multiline: true,
                    rows: '10',
                    // defaultValue: 'Введите текст статьи',
                    width: '225',
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
                    width: '225',
                  };

                  const inputTagsProps = {
                    size: 'small',
                    name: 'tagList',
                    as: 'input',
                    component: TextField,
                    label: 'Теги',
                    variant: 'outlined',
                    error: touched.tagList && Boolean(errors.tagList),
                    value: values.tagList,
                    onChange: handleChange('tagList'),
                    onBlur: handleBlur('tagList'),
                    width: '225',
                  };

                  return (
                    <Form>
                      <InputDiv>
                        <Field {...inputTitleProps} />
                        {touched.title ? errors.title : ''}
                      </InputDiv>

                      <InputDiv>
                        <Field {...inputDescriptionProps} />
                        {touched.name ? errors.name : ''}
                      </InputDiv>

                      <InputDiv>
                        <Field {...inputTagsProps} />
                        {touched.name ? errors.name : ''}
                      </InputDiv>

                      <InputDiv>
                        <Field {...inputBodyProps} />
                        {touched.name ? errors.name : ''}
                      </InputDiv>

                      <StyledButton
                        variant="contained"
                        size="small"
                        color="primary"
                        disabled={!dirty || !isValid}
                        type="submit"
                      >
                        Добавить статью
                      </StyledButton>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const InputDiv = styled.div`
  margin-bottom: 20px;
`;
