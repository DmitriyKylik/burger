import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from "./Auth.scss";


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
    }
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

  render() {
    const formElementsArray = [];

    for(let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const form = formElementsArray.map(formElement => (
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

    return (
      <div className={classes.Auth}>
        <h2>Sign up!</h2>
        <form>
          {form}
          <Button
            btnType="Success"
            // disabled={!this.state.formIsValid}
            classes={classes.submitButton}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default Auth;
