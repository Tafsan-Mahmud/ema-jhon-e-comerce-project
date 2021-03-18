import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Header/Shop/Shop';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router,  Route, Switch } from 'react-router-dom';
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import Nomatch from './components/Nomatch/Nomatch';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivetRoute from './components/PrivetRoute/PrivetRoute';

export const userContex = createContext();
function App() {
  const [logedInUser , setLogedInUser] = useState({}); 
  return (
    <userContex.Provider value={[logedInUser , setLogedInUser]}>
      <Router>
        <h3>email:{logedInUser.email}</h3>
      <Header></Header>
        <Switch>
          <Route path="/shop">
          <Shop></Shop>
          </Route>
          <Route path="/Order">
          <Review></Review>
          </Route>
          <PrivetRoute path="/inventory">
            <Manage></Manage>
          </PrivetRoute>
          <PrivetRoute path="/shipment">
            <Shipment></Shipment>
          </PrivetRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:ProductKey">
            <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
          <Nomatch></Nomatch>
          </Route>
        </Switch>
      </Router>
    </userContex.Provider>
  );
}

export default App;
