import React from 'react';
import Header from './components/header'
import Footer from './components/footer'
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
// import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
    	<div style={{"backgroundColor": "rgb(35, 41, 49)"}}>
      		<Header/>
      		<Footer/>
      	</div>      
    </div>
  );
}

export default App;
