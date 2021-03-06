import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import Aux from '../../hoc/Auxilliary/auxilliary';
import { Input } from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from "./Auth.scss";
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';


const auth = props => {
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    debugger;
    if(!props.burgerBuilding && props.authRedirectPath !== '/') {
      props.onSetAuthRedirectPath();
    }
  });

  const switchSignModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  let errorMessage = null;

  if(props.error) {
    errorMessage = (
      <p className={classes.error}>{props.error.message}</p>
    );
  }

  let form = (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required('Required')
          .email('Invalid email address'),
        password: Yup.string()
          .required('Required')
      })}
      onSubmit={(values, {setSubmitting}) => {
        props.onAuth(values.email, values.password, isSignUp);
      }}>
        <Form className={classes.authForm}>
          <Aux>
            {errorMessage}
            <Input
              name="email"
              type="email"
              placeholder="Your email"/>
            <Input
              name="password"
              type="password"
              placeholder="Your password"/>
            <Button
              type="submit"
              btnType="Success"
              classes={classes.submitButton}>
              Submit
            </Button>
          </Aux>
        </Form>
    </Formik>
  );

  if(props.loading) {
    form = <Spinner/>;
  }

  let authRedirect = null;

  if(props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath}/>
  }

  return (
    <div className={classes.auth}>
      <h2>Sign {isSignUp ? 'Up' : 'In'}!</h2>
      {authRedirect}
      {form}
      <Button btnType="Danger" clicked={switchSignModeHandler}>
        Switch to {isSignUp ? "Sign In" : "Sign Up"}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    burgerBuilding: state.burgerBuilder.building,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.authLoad(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(auth, axios));
