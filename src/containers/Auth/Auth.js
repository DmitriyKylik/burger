import React, {Component} from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from "./Auth.scss";
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';


class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true,
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = JSON.parse(JSON.stringify(this.state.controls));

    updatedControls[controlName].value = event.target.value;
    updatedControls[controlName].valid = this.checkValidity(event.target.value, updatedControls[controlName].validation);
    updatedControls[controlName].touched = true;

    this.setState({controls: updatedControls});
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  submitHandler = (event) => {
    event.preventDefault();

    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  };

  switchSignModeHandler = () => {
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      }
    });
  };

  render() {
    const formElementsArray = [];

    for(let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let errorMessage = null;

    let form = formElementsArray.map(formElement => (
      <Input
        touched={formElement.config.touched}
        shouldValidate={formElement.config.validation}
        isValid={formElement.config.valid}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        key={formElement.id}/>
    ));

    if(this.props.loading) {
      form = <Spinner/>;
    }

    if(this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }


    return (
      <div className={classes.Auth}>
        <h2>Sign {this.state.isSignUp ? 'Up' : 'In'}!</h2>
        <form onSubmit={this.submitHandler}>
          {errorMessage}
          {form}
          <Button
            btnType="Success"
            // disabled={!this.state.formIsValid}
            classes={classes.submitButton}>
            Submit
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.switchSignModeHandler}>
          Switch to {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.authLoad(email, password, isSignUp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
