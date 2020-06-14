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

import {setCurrentMenuItem} from '../../../redux/actions/actionCreators';
import {createArticleRequest} from '../../../services/serverApi';
import {baseRoutePath} from '../../../services/paths.js';

const SignUpSchema = Yup.object().shape({
  title: Yup.string().required('Обязательное поле'),
  description: Yup.string().required('Обязательное поле'),
  body: Yup.string().required('Обязательное поле'),
});

class CreateArticleForm extends Component {
  handleSubmit = async values => {
    const {title, description, body, tagList} = values;
    const newArticle = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };
    await createArticleRequest(newArticle);
    this.props.history.push(baseRoutePath);
  };

  componentDidMount() {
    const {setCurrentMenuItem} = this.props;
    setCurrentMenuItem('createArticle');
  }

  render() {
    const initialValues = {
      title: '',
      description: '',
      body: '',
      tag: '',
      tagList: [],
    };

    return (
      <Formik
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

          const inputTagProps = {
            size: 'small',
            name: 'tag',
            as: 'input',
            component: TextField,
            label: 'Тег',
            variant: 'outlined',
            value: values.tag,
            onChange: handleChange('tag'),
            error: touched.tag && errors.tag,
            onBlur: handleBlur('tag'),
            style: {marginRight: '15px'},
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

                  <Button {...buttonAddArticleProps}>Добавить статью</Button>
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

const mapDispatchToProps = dispatch => {
  return {
    setCurrentMenuItem: page => dispatch(setCurrentMenuItem(page)),
  };
};

export default connect(null, mapDispatchToProps)(CreateArticleForm);
