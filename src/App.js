import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';

function App() {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }


  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="navbar">
          <div className="navbar-brand">
            <Link className="brand" to="/">GroceryApp</Link>
          </div>
          <div>
            <Link to="/cart"> <i className="fa fa-shopping-cart"></i> &nbsp; Cart &nbsp; 
                {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>)}</Link>
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#"> <i className="fa fa-user"></i> &nbsp;
                    {userInfo.username} <i className="fa fa-caret-down"></i>{' '}</Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile"><i className="fa fa-user-o " /> &nbsp;User Profile</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory"><i className="fa fa-history" /> &nbsp; Order history</Link>
                    </li>
                    <li><Link to="#signout" onClick={signoutHandler}><i className="fa fa-sign-out"></i>&nbsp;Sign out</Link></li>
                  </ul>
                </div>
              ) : (<Link to="/signin">Sign In</Link>)
            }
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">Admin <i className="fa fa-caret-down"></i></Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/productList">Product List</Link>
                </li>
              </ul>
              </div>
            )}</div>
        </header>
          <main>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/payment" component={PaymentScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
            <PrivateRoute path="/profile" component={UserProfileScreen}></PrivateRoute>
            <Route path="/" component={HomeScreen} exact></Route>
          </main>
          <Footer /> 
      </div>
    </BrowserRouter>
  );
}

export default App;
