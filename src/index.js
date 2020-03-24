import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';

var history = createBrowserHistory();
ReactGA.initialize('UA-161761065-1');

history.listen((location) => {
    window.ga('set', 'page', location.pathname + location.search);
    window.ga('send', 'pageview');
});


ReactDOM.render(
	<BrowserRouter history={history}>
		<App />
	</BrowserRouter>, 
	document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
