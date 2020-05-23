import React, {Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {connect} from 'react-redux';

import {Formik, Form, Field} from 'formik';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {makeHeadersForAuth} from '../../utils/utils';
import PersonalArea from '../personalArea/personalArea.jsx';
import {currentArticleLoaded, setCurrentMenuItem} from '../../redux/actions/actionCreators';

class Edit extends Component {
  getArticleFromServer = () => {
    const {slug} = this.props.match.params;
    axios.get(`https://conduit.productionready.io/api/articles/${slug}`).then(response => {
      this.props.currentArticleLoaded(response.data.article);
    });
  };

  componentDidMount() {
    const {setCurrentMenuItemNull} = this.props;
    this.getArticleFromServer();
    setCurrentMenuItemNull('');
  }

  render() {
    const {slug} = this.props.match.params;
    const {currentArticle = {author: {username: null}}} = this.props;
    const {title, description, body, tagList} = currentArticle;

    const initialValues = {
      title,
      description,
      body,
      tagList,
    };

    const handleSubmit = async values => {
      const headers = makeHeadersForAuth();
      const {title, description, body, tagList} = values;
      const updArticle = {
        article: {
          title: title,
          description: description,
          body: body,
          tagList: [tagList],
        },
      };
      await axios
        .put(`https://conduit.productionready.io/api/articles/${slug}`, updArticle, {
          headers,
        })
        .then(() => this.props.history.push('/blog-platform/'));
    };

    return (
      <>
        <div style={{marginTop: '15px'}}>
          <div style={{display: 'flex', marginBottom: '15px'}}>
            <PersonalArea history={this.props.history} />

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
                <h1>Редактировать статью</h1>
              </div>

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

                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        disabled={!dirty || !isValid}
                        type="submit"
                      >
                        Редактировать
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const InputDiv = styled.div`
  margin-bottom: 20px;
`;

function mapStateToProps(state) {
  return {
    currentArticle: state.currentArticle,
    currentMenuItem: state.currentMenuItem,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    currentArticleLoaded: currentArticle => dispatch(currentArticleLoaded(currentArticle)),
    setCurrentMenuItemNull: currentMenuItem => dispatch(setCurrentMenuItem(currentMenuItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
