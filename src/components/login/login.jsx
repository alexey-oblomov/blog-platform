import React, {Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Formik, Form, Field} from 'formik';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {
  articlesLoaded,
  authorized,
  getCurrentUserProfile,
  setCurrentMenuItem,
} from '../../redux/actions/actionCreators';
import CustomizedInputPassword from '../inputPassword/inputPassword';
import {isAuth} from '../../utils/utils.js';
import ListArticles from '../listArticles/listArticles.jsx';

class Login extends Component {
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
    }
  }

  setLoginDataToLocalStorage = data => {
    const {username, email, token, bio, image} = data;
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    localStorage.setItem('bio', bio);
    localStorage.setItem('image', image);
  };

  render() {
    const {history} = this.props;
    const initialValues = {
      name: '',
      password: '',
      email: '',
    };

    const handleSubmit = async values => {
      const {authorization, history, setCurrentUser, setCurrentMenuItem} = this.props;
      const {email, password} = values;
      const loginData = {
        user: {
          email,
          password,
        },
      };
      const response = await axios.post(
        'https://conduit.productionready.io/api/users/login',
        loginData
      );
      const {user} = response.data;
      this.setLoginDataToLocalStorage(user);
      setCurrentUser(user);
      authorization(true);
      setCurrentMenuItem('showAllArticles');
      history.push('/blog-platform');
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
                required: false,
              };

              return (
                <Form>
                  <WrapperDiv>
                    <HeadingDiv>Авторизация</HeadingDiv>

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
                      Войти
                    </Button>
                  </WrapperDiv>
                  <SignupLinkSpan>
                    <Link to="/blog-platform/signup" style={{color: '#3a3833'}}>
                      Регистрация
                    </Link>
                  </SignupLinkSpan>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div style={{display: 'flex', marginBottom: '15px'}}>
          <ListArticles history={history} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {articles, articlesCount, autorized, currentUser, currentMenuItem} = state;
  return {
    articles,
    articlesCount,
    autorized,
    currentUser,
    currentMenuItem,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    articlesLoaded: (articles, articlesCount) => dispatch(articlesLoaded(articles, articlesCount)),
    authorization: auth => dispatch(authorized(auth)),
    setCurrentUser: user => dispatch(getCurrentUserProfile(user)),
    setCurrentMenuItem: currentMenuItem => dispatch(setCurrentMenuItem(currentMenuItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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

const SignupLinkSpan = styled.span`
  display: block;
  padding-top: 20px;
`;
