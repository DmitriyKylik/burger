import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Button from '../../../components/UI/Button/Button';
import classes from './CheckoutData.scss';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import { Input, CustomSelect, } from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionsType from '../../../store/actions/index';
import Aux from '../../../hoc/Auxilliary/auxilliary';

class CheckoutData extends Component {

  state = {
    countryOptions: [
      { value: 'ukraine', label: 'Ukraine' },
      { value: 'germany', label: 'Germany' },
      { value: 'japan', label: 'Japan' }
    ],
    deliveryOptions: [
      { value: 'fastest', label: 'Fastest' },
      { value: 'cheapest', label: 'Cheapest' },
    ]
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

  // inputChangedHandler = (event, inputIdentifier) => {
  //   const updatedOrderForm = JSON.parse(JSON.stringify(this.state.orderForm));
  //   let formIsValid = true;
  //
  //   updatedOrderForm[inputIdentifier].value = event.target.value;
  //   updatedOrderForm[inputIdentifier].touched = true;
  //   updatedOrderForm[inputIdentifier].valid = this.checkValidity(event.target.value, updatedOrderForm[inputIdentifier].validation);
  //
  //   for(let inputIdentifier in updatedOrderForm) {
  //     if(updatedOrderForm[inputIdentifier].hasOwnProperty('valid')) {
  //       formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
  //     }
  //   }
  //   console.log(formIsValid);
  //   this.setState({
  //     orderForm: updatedOrderForm,
  //     formIsValid: formIsValid,
  //   });
  // };

  // checkValidity (value, rules) {
  //   let isValid = true;
  //
  //   if(!rules) {
  //     return true;
  //   }
  //
  //   if(rules.required) {
  //     isValid = value.trim() !== '';
  //   }
  //
  //   if(rules.minLength) {
  //     isValid = value.length > rules.minLength && isValid;
  //   }
  //
  //   if(rules.maxLength) {
  //     isValid = value.length < rules.maxLength && isValid;
  //   }
  //
  //   return isValid;
  // }

  render() {
    // const formElementsArray = [];
    //
    // for(let key in this.state.orderForm) {
    //   formElementsArray.push({
    //     id: key,
    //     config: this.state.orderForm[key],
    //   });
    // }

    let form = (
      <Aux>
        <p>Please add your contact data!</p>
        <Formik
          initialValues={{
            name: '',
            address: '',
            email: '',
            zipCode: '',
            country: '',
            deliveryMethod: '',
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required('Required')
              .matches(/^[\sA-Za-zА-Яа-яЁёА-Яа-яёЁЇїІіЄєҐґ'-]+$/, 'Name must contain only letters'),
            email: Yup.string().required('Required').email('Invalid email address'),
            address: Yup.string().required('Required'),
            zipCode: Yup.string().required('Required'),
            country: Yup.string().required("Select Country"),
            deliveryMethod: Yup.string().required("Select Method"),
          })
          }
          onSubmit={(values, {isSubmitting}) => {

          }}>
            <Form>
              <Input
                type="text"
                name="name"
                placeholder="Your name"/>
              <Input
                type="email"
                name="email"
                placeholder="Your email"/>
              <Input
                type="text"
                name="address"
                placeholder="Your address"/>
              <Input
                type="text"
                name="zipCode"
                placeholder="Your Zip Code"/>
              <CustomSelect
                options={this.state.countryOptions}
                name="country"/>
              <CustomSelect
                options={this.state.deliveryOptions}
                name="deliveryMethod"/>
              <Button
                btnType="Success"
                // disabled={!this.state.formIsValid}
                classes={classes.submitButton}>
                Order
              </Button>
            </Form>
        </Formik>
      </Aux>
    );

    if(this.props.loading) {
      form = <Spinner/>;
    }

    return (
      <div className={classes.CheckoutData}>
        {form}

        {/*<form onSubmit={this.orderHandler}>*/}
          {/*{formElementsArray.map(formElement => (*/}
            {/*<Input*/}
              {/*touched={formElement.config.touched}*/}
              {/*shouldValidate={formElement.config.validation}*/}
              {/*isValid={formElement.config.valid}*/}
              {/*changed={(event) => this.inputChangedHandler(event, formElement.id)}*/}
              {/*elementType={formElement.config.elementType}*/}
              {/*elementConfig={formElement.config.elementConfig}*/}
              {/*value={formElement.config.value}*/}
              {/*key={formElement.id}/>*/}
          {/*))}*/}
          {/*<Button*/}
            {/*btnType="Success"*/}
            {/*disabled={!this.state.formIsValid}*/}
            {/*classes={classes.submitButton}>*/}
            {/*Order*/}
          {/*</Button>*/}
        {/*</form>*/}
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
