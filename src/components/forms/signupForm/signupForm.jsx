import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';

import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {CustomizedInputPassword} from '../customInputPassword';

// import {setAuthorized, setCurrentUserProfile} from '../../../redux/actions/actionCreators';
import {
  setCurrentUserProfile,
  setAuthorized,
} from '../../../redux/actions/currentUser/createActions.js';
import {loginRequest, signupRequest} from '../../../services/serverApi';
import {setTokenToLocalStorage} from '../../../services/localStorageApi.js';
import {baseRoutePath} from '../../../services/paths.js';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле'),
  password: Yup.string()
    .min(8, 'Не менее 8 символов')
    .max(72, 'Не более 72 символов.')
    .required('Обязательное поле'),
  email: Yup.string().email('Некорректный адрес').required('Обязательное поле'),
});

function SignupForm(props) {
  const initialValues = {
    name: '',
    password: '',
    email: '',
  };

  const handleSubmit = async (values, {setFieldError}) => {
    const {setAuth, history, setCurrentUser} = props;
    const {name, email, password} = values;
    const regData = {
      user: {
        username: name,
        email,
        password,
      },
    };

    try {
      const regResponse = await signupRequest(regData);
      if (regResponse.status === 200) {
        const loginData = {
          user: {
            email,
            password,
          },
        };

        const loginResponse = await loginRequest(loginData);
        const {user} = await loginResponse.data;
        const {token} = await user;
        await setTokenToLocalStorage(token);
        await setCurrentUser(user);
        await setAuth(true);
        history.push(baseRoutePath);
      }
    } catch (error) {
      const {email, username, password} = error.response.data.errors;
      setFieldError('email', email);
      setFieldError('name', username);
      setFieldError('password', password);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SignUpSchema}>
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
          <ContainerDiv>
            <Form>
              <WrapperDiv>
                <HeadingDiv>Регистрация</HeadingDiv>

                <InputDiv>
                  <Field {...inputNameProps} />
                  <ErrorDiv>{touched.name ? errors.name : ''}</ErrorDiv>
                </InputDiv>

                <InputDiv>
                  <Field {...inputEmailProps} />
                  <ErrorDiv>{touched.email ? errors.email : ''}</ErrorDiv>
                </InputDiv>

                <InputDiv>
                  <CustomizedInputPassword {...passwordProps} />
                  <ErrorDiv>{touched.password ? errors.password : ''}</ErrorDiv>
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

                <Link to="/blog-platform/login" style={{color: '#3a3833', marginTop: '20px'}}>
                  Войти
                </Link>
              </WrapperDiv>
            </Form>
          </ContainerDiv>
        );
      }}
    </Formik>
  );
}

function mapStateToProps(state) {
  const {articles, articlesCount} = state.articles;
  const {isAutorized} = state.currentUser;
  return {
    articles,
    articlesCount,
    isAutorized,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setAuth: auth => dispatch(setAuthorized(auth)),
    setCurrentUser: user => dispatch(setCurrentUserProfile(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);

const ContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  min-height: 800px;
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 0 0 6px 0 #34495e;
  padding: 12px;
  min-width: 300px;
  margin: 5px;
  margin-right: 15px;
  margin-top: 6px;
`;

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeadingDiv = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const InputDiv = styled.div`
  max-width: 225px;
  margin-bottom: 15px;
`;

const ErrorDiv = styled.div`
  height: 7px;
  color: red;
  padding-left: 10px;
`;
