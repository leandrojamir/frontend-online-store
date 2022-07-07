import React from 'react';
import { Route } from "react-router-dom";
import Search from "./components/search";
import { BrowserRouter } from "react-router-dom"; 

class App extends React.Component {
  render() {
    return( 
      <BrowserRouter>
        <Route exact path="/" component={ Search } /> 
      </BrowserRouter>
    )
  }
}

export default App;
