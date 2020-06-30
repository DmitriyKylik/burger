import React, {Component} from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './CheckoutData.scss';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionsType from '../../../store/actions/index';

class CheckoutData extends Component {

  state = {
    orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your name',
          },
          value: '',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 3,
            maxLength: 6,
          }
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street',
          },
          value: '',
          valid: false,
          touched: false,
          validation: {
            required: true,
          }
        },
        email: {
          elementType: 'email',
          elementConfig: {
            type: 'email',
            placeholder: 'Your email',
          },
          value: '',
          valid: false,
          touched: false,
          validation: {
            required: true,
          }
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Zip Code',
          },
          value: '',
          valid: false,
          touched: false,
          validation: {
            required: true,
          }
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country',
          },
          value: '',
          valid: false,
          touched: false,
          validation: {
            required: true,
          }
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', outputValue: 'Fastest'},
              {value: 'cheapest', outputValue: 'Cheapest'}
            ]
          },
          value: 'fastest',
          validation: {},
        },
      },
    formIsValid: false,
    // loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };

    for(let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    console.log(this.props.token);
    this.props.onPurchaseBurger(order, this.props.token);

    // axios.post('orders.json', order)
    //   .then(response => {
    //     this.setState({loading: false});
    //     this.props.history.replace('/');
    //   })
    //   .catch(error => {
    //     this.setState({loading: false});
    //   });
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = JSON.parse(JSON.stringify(this.state.orderForm));
    let formIsValid = true;

    updatedOrderForm[inputIdentifier].value = event.target.value;
    updatedOrderForm[inputIdentifier].touched = true;
    updatedOrderForm[inputIdentifier].valid = this.checkValidity(event.target.value, updatedOrderForm[inputIdentifier].validation);

    for(let inputIdentifier in updatedOrderForm) {
      if(updatedOrderForm[inputIdentifier].hasOwnProperty('valid')) {
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
      }
    }
    console.log(formIsValid);
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
    });
  };

  checkValidity (value, rules) {
    let isValid = true;

    if(!rules) {
      return true;
    }

    if(rules.required) {
      isValid = value.trim() !== '';
    }

    if(rules.minLength) {
      isValid = value.length > rules.minLength && isValid;
    }

    if(rules.maxLength) {
      isValid = value.length < rules.maxLength && isValid;
    }

    //In state if input has property isEmail, for example, add  this check
    // if(rules)

    return isValid;
  }

  render() {
    const formElementsArray = [];

    for(let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <React.Fragment>
        <p>Please add your contact data!</p>
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formElement => (
            <Input
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validation}
              isValid={formElement.config.valid}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              key={formElement.id}/>
          ))}
          <Button
            btnType="Success"
            disabled={!this.state.formIsValid}
            classes={classes.submitButton}>
            Order
          </Button>
        </form>
      </React.Fragment>
    );

    if(this.props.loading) {
      form = <Spinner/>;
    }

    return (
      <div className={classes.CheckoutData}>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseBurger: (orderData, token) => dispatch(actionsType.purchaseBurger(orderData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(CheckoutData, axios));
