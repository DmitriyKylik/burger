import React, {Component} from 'react';
import { Router } from 'react-router-dom';
import Burger from '../../components/Burger/Burger';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import classes from './Checkout.scss';

class Checkout extends Component {

  state = {};

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    for(let [key, value] of query.entries()) {
      ingredients[key] = value;
    }
    this.setState({
      ingredients: {...ingredients},
      ingredientsSequence: [...this.props.history.location.state.ingredientsSequence],
    });

  }

  cancelCheckoutHandler = () => {
    this.props.history.push('/');
  };

  render() {
    let burger = this.state.ingredientsSequence ? <Burger ingredientsSequence={this.state.ingredientsSequence} /> : <Spinner/>;
    return (
      <div className={classes.Checkout}>
        <h1>Burger Checkout</h1>
        {burger}
        <div className={classes.btnWrapper} classes={classes.controlBtn}>
          <Button btnType="Danger" classes={classes.controlBtn} clicked={this.cancelCheckoutHandler}>
            Cancel
          </Button>
          <Button btnType="Success" classes={classes.controlBtn} clicked={this.cancelCheckoutHandler}>
            Continue
          </Button>
        </div>
      </div>
    );
  }
}

export default Checkout;
