import React, {Component} from 'react';

import './assets/css/main.css';
import './assets/scss/main.global.scss';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    // console.log('[App.js] constructor');
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            <BurgerBuilder/>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
