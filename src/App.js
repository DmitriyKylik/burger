import React, {Component, Suspense} from 'react';
import {connect} from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './assets/css/main.css';
import './assets/scss/main.global.scss';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders'
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

class App extends Component {
  //Optz
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" render={() => <Suspense fallback={<Spinner/>}><Auth/></Suspense>} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );


    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" render={(props) => <Suspense fallback={<Spinner/>}><Checkout {...props}/></Suspense>} />
          <Route path="/orders" render={(props) => <Suspense fallback={<Spinner/>}><Orders {...props}/></Suspense>} />
          <Route path="/auth" render={(props) => <Suspense fallback={<Spinner/>}><Auth {...props}/></Suspense>} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
        <div>
          <Layout>
            {routes}
          </Layout>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
