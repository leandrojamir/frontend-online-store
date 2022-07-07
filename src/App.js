import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Search from './components/search';
import Category from './components/category';

class App extends React.Component {
  render() {
    return (
      <>
        <h1>Home</h1>
        <Category />
        <BrowserRouter>
          <Route exact path="/" component={ Search } />
        </BrowserRouter>
      </>
    );
  }
}

export default App;
