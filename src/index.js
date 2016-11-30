import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import App from './components/App';
import Payment from './components/Payment/Payment';
import CustomForm from './components/CustomForm/CustomForm';
import Receipt from './components/Receipt/Receipt';
import './index.css';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="direct" component={Payment}/>
            <Route path="custom" component={CustomForm}/>
            <Route path="payment" component={Receipt}/>
        </Route>
    </Router>,
    document.getElementById('root')
);
