import React, {Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {connect} from 'react-redux';
import {articlesLoaded, authorized} from '../../redux/actions/actionCreators';
import {Link} from 'react-router-dom';
import {Formik, Form, Field} from 'formik';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CustomizedInputPassword from '../inputPassword/inputPassword';
import {isAuth} from '../../utils/utils.js';
import ListArticles from '../listArticles/listArticles.jsx';

class Signup extends Component {
  getListArticles = () => {
    axios.get('https://conduit.productionready.io/api/articles?limit=9').then(response => {
      const {articles, articlesCount} = response.data;
      this.props.articlesLoaded(articles, articlesCount);
    });
  };

  setAuthorization = () => {
    const {authorization} = this.props;
    const auth = isAuth();
    authorization(auth);
  };

  componentDidMount() {
    const {authorized, history} = this.props;
    this.setAuthorization();
    if (!authorized) {
      this.getListArticles();
    } else {
      history.push('/blog-platform');
      // return <Redirect to="/blog-platform" />;
    }
  }

  render() {
    const {history} = this.props;
    const auth = isAuth();
    if (auth) {
      history.push('/blog-platform');
    }

    const initialValues = {
      name: '',
      password: '',
      email: '',
    };

    const handleSubmit = async values => {
      const reqData = {
        user: {
          username: values.name,
          email: values.email,
          password: values.password,
        },
      };

      await axios
        .post('https://conduit.productionready.io/api/users', reqData)
        .then(response => {
          localStorage.setItem('username', response.data.user.username);
          history.push('/blog-platform');
        })
        .catch(error => {
          console.log(error.response.data.errors);
        });
    };

    return (
      <div style={{display: 'flex', marginBottom: '15px', marginTop: '15px'}}>
        <div
          style={{
            minHeight: '800px',
            border: '1px solid gray',
            borderRadius: '10px',
            boxShadow: '0 0 6px 0 #34495e',
            padding: '12px',
            minWidth: '300px',
            margin: '5px',
            marginRight: '15px',
          }}
        >
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({values, handleChange, handleBlur, errors, touched, dirty, isValid}) => {
              const inputNameProps = {
                size: 'small',
                name: 'name',
                as: 'input',
                component: TextField,
                label: 'Имя',
                variant: 'outlined',
                error: touched.name && Boolean(errors.name),
                value: values.name,
                onChange: handleChange('name'),
                onBlur: handleBlur('name'),
                required: true,
                width: 225,
              };

              const inputEmailProps = {
                size: 'small',
                name: 'email',
                as: 'input',
                component: TextField,
                label: 'Электронная почта',
                variant: 'outlined',
                onChange: handleChange('email'),
                error: touched.email && Boolean(errors.email),
                onBlur: handleBlur('email'),
                required: true,
              };
              const passwordProps = {
                name: 'password',
                errors,
                values,
                touched,
                onChange: handleChange('password'),
                onBlur: handleBlur('password'),
                label: 'Пароль',
                labelWidth: 65,
                required: true,
              };

              return (
                <Form>
                  <WrapperDiv>
                    <HeadingDiv>Регистрация</HeadingDiv>

                    <InputDiv>
                      <Field {...inputNameProps} />
                      {touched.name ? errors.name : ''}
                    </InputDiv>

                    <InputDiv>
                      <Field {...inputEmailProps} />
                      {touched.email ? errors.email : ''}
                    </InputDiv>

                    <InputDiv>
                      <CustomizedInputPassword {...passwordProps} />
                      {touched.password ? errors.password : ''}
                    </InputDiv>

                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      disabled={!dirty || !isValid}
                      type="submit"
                    >
                      Зарегистрироваться
                    </Button>

                    <LoginLinkSpan>
                      <Link to="/blog-platform/login" style={{color: '#3a3833'}}>
                        Войти
                      </Link>
                    </LoginLinkSpan>
                  </WrapperDiv>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div style={{display: 'flex', marginBottom: '15px'}}>
          <ListArticles />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.articles,
    articlesCount: state.articlesCount,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    articlesLoaded: (articles, articlesCount) => dispatch(articlesLoaded(articles, articlesCount)),
    authorization: auth => dispatch(authorized(auth)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeadingDiv = styled.div`
  margin-bottom: 20px;
  padding-top: 0;
  text-align: center;
`;

const InputDiv = styled.div`
  margin-bottom: 20px;
`;

const LoginLinkSpan = styled.span`
  display: block;
  padding-top: 20px;
`;
