import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store/store';

import "./main.scss";
import Footer from './Components/Footer';
import routes from './routes';

function App() {
  return (
    <Provider store={store}>
     
    <BrowserRouter>
      {routes}
      <Footer />
    </BrowserRouter>
    
  </Provider>
  );
}

export default App;
