import React, {Component} from 'react';
import classes from './assets/css/main.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder/>
        </Layout>
      </div>
    );
  }

}

export default App;
