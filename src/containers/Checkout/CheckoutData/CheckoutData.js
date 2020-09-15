import React, { useState } from 'react';
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

const CheckoutData = (props) => {
  const [countriesState] = useState([
    { value: 'ukraine', label: 'Ukraine' },
    { value: 'germany', label: 'Germany' },
    { value: 'japan', label: 'Japan' }
  ]);
  const [deliveryState] = useState([
    { value: 'fastest', label: 'Fastest' },
    { value: 'cheapest', label: 'Cheapest' },
  ]);

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
        onSubmit={(values, {setSubmitting}) => {
          const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: values,
            userId: props.userId,
          };
          props.onPurchaseBurger(order, props.token)
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
              options={countriesState}
              name="country"/>
            <CustomSelect
              options={deliveryState}
              name="deliveryMethod"/>
            <Button
              type="submit"
              btnType="Success"
              classes={classes.submitButton}>
              Order
            </Button>
          </Form>
      </Formik>
    </Aux>
  );

  if(props.loading) {
    form = <Spinner/>;
  }

  return (
    <div className={`${classes.CheckoutData} ${classes.fadeIn}`}>
      {form}
    </div>
  );
};

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
