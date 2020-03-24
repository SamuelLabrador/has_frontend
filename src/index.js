import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-161761065-1');

var history = createBrowserHistory();
console.log(window.ga);

history.listen((location) => {
	console.log('sending new location', location.pathname + location.search)
	ReactGA.pageview(window.location.pathname + window.location.search);
});

ReactDOM.render(
	<Router history={history}>
		<App />
	</Router>, 
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
