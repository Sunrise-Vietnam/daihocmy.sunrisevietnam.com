require('expose?$!expose?jQuery!jquery');
require("bootstrap-webpack");
require('./main.css');
require('!style!css!react-bootstrap-modal/lib/styles/rbm-complete.css');
require('bootstrap-select');
require('!style!css!bootstrap-select/dist/css/bootstrap-select.min.css');

import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App.jsx';
import Index from './components/Index.jsx';
import ThanksYou from './components/ThanksYou.jsx';
import { Router, Route, Redirect, Link, browserHistory } from 'react-router';

ReactDom.render((
    <Router history={browserHistory}>
        <Route component={App}>
            <Route path="/" component={Index}/>
            <Route path="thanks-you" component={ThanksYou}/>
        </Route>
    </Router>
), document.getElementById('app'))
