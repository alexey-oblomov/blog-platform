import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {Formik, Form, Field} from 'formik';

import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {CustomizedInputPassword} from '../customInputPassword';

import {
  setCurrentUserProfile,
  setAuthorized,
} from '../../../redux/actions/currentUser/createActions.js';
import {loginRequest} from '../../../services/serverApi.js';
import {setTokenToLocalStorage} from '../../../services/localStorageApi.js';
import {baseRoutePath} from '../../../services/paths.js';

function LoginForm(props) {
  const initialValues = {
    password: '',
    email: '',
  };

  const handleSubmit = async (values, {setFieldError}) => {
    const {setAuth, history, setCurrentUser} = props;
    const {email, password} = values;
    const loginData = {
      user: {
        email,
        password,
      },
    };

    try {
      const loginResponse = await loginRequest(loginData);
      if (loginResponse.status === 200) {
        const {user: currentUser} = await loginResponse.data;
        const {token} = await currentUser;
        await setTokenToLocalStorage(token);
        await setCurrentUser({currentUser});
        await setAuth({isAuthorized: true});
        history.push(baseRoutePath);
      }
    } catch (error) {
      setFieldError('email', 'Некорректные данные');
      setFieldError('password', ' ');
    }
  };

  const linkStyle = {color: '#3a3833', marginTop: '20px'};

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({values, handleChange, handleBlur, errors, touched, dirty, isValid}) => {
        const inputEmailProps = {
          size: 'small',
          name: 'email',
          as: 'input',
          component: TextField,
          value: values.email,
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
          required: true,
        };

        return (
          <ContainerDiv>
            <Form>
              <WrapperDiv>
                <HeadingDiv>
                  Авторизация
                  <ErrorDiv>{touched.email ? errors.email : ''}</ErrorDiv>
                </HeadingDiv>

                <InputDiv>
                  <Field {...inputEmailProps} />
                </InputDiv>

                <InputDiv>
                  <CustomizedInputPassword {...passwordProps} />
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
                <Link to="/blog-platform/signup" style={linkStyle}>
                  Регистрация
                </Link>
              </WrapperDiv>
            </Form>
          </ContainerDiv>
        );
      }}
    </Formik>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    setAuth: auth => dispatch(setAuthorized(auth)),
    setCurrentUser: user => dispatch(setCurrentUserProfile(user)),
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);

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
  margin-bottom: 20px;
`;

const ErrorDiv = styled.div`
  height: 7px;
  color: red;
`;
