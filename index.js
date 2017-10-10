import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from './Registration/Registration';
import './Registration/Registration.css'

import ViewEmployees from './ViewEmployees/ViewEmployees';
import './ViewEmployees/ViewEmployees.css';

import EditEmploy from './EditEmploy/EditEmploy';
import './EditEmploy/EditEmploy.css'

import DeleteEmploy from './DeleteEmploy/DeleteEmploy';
import './DeleteEmploy/DeleteEmploy.css'

import LogIn from './LogIn/LogIn';

import { Router, Route, IndexRoute } from 'react-router'
import { HashRouter } from 'react-router-dom'
import Link from 'link-react';
import { toast } from 'react-toastify';

window.jQuery = window.$ = require("jquery");
var bootstrap = require("bootstrap");

ReactDOM.render((
    <HashRouter>
        <div>
            <ToastContainer autoClose={3000} position="top-center" />
            <App>
                <Route exact path="/" component={LogIn} />
                <Route exact path="/LogIn" component={LogIn} /> 
                <Route exact path="/Registration" component={Registration} />
                <Route exact path="/ViewEmployees" component={ViewEmployees} />
                <Route exact path="/EditEmploy/:id" component={EditEmploy} />
                <Route exact path="/DeleteEmploy/:id" component={DeleteEmploy} />
            </App>
        </div>
    </HashRouter>
 ) , document.getElementById('root'));

 //ReactDOM.render (<Registration />, document.getElementById('root'));
 //ReactDOM.render(<ViewEmployees />, document.getElementById('root'));
// registerServiceWorker();
//  