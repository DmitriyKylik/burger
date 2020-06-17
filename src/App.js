import React, {Component} from 'react';

import './assets/css/main.css';
import './assets/scss/main.global.scss';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    // console.log('[App.js] constructor');
  }

  render() {
    return (
        <div>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/" component={BurgerBuilder} />
            </Switch>
          </Layout>
        </div>
    );
  }

}

export default App;
