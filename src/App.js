import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Header/Shop/Shop';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router,  Route, Switch } from 'react-router-dom';
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import Nomatch from './components/Nomatch/Nomatch';
import ProductDetails from './components/ProductDetails/ProductDetails';


function App() {
  return (
    <div>
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
          <Shop></Shop>
          </Route>
          <Route path="/Order">
          <Review></Review>
          </Route>
          <Route path="/inventory">
            <Manage></Manage>
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
    </div>
  );
}

export default App;
