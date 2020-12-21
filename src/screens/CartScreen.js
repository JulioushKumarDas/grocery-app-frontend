import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search
        ? Number(props.location.search.split('=')[1]) 
        : 1;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
    };

    return (
        <div className="row top ">
            <div className="col">
                <h1>Cart</h1>
                {cartItems.length === 0 ? <MessageBox>
                    Cart is empty <Link to="/">Go to Home Page</Link>
                </MessageBox>
                    :
                    (
                        <ul>
                            {
                                cartItems.map((item) => (
                                    <li key={item.product}>
                                        <div className="row roundedBorder">
                                            <div className="col-2">
                                                <img src={item.image} alt={item.name} className="small"></img>
                                            </div>
                                            <div className="col-4">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div className="col-2">
                                                <select value={item.qty} onChange={(e) =>
                                                    dispatch(
                                                        addToCart(item.product, 
                                                        Number(e.target.value))
                                                    )} className="form-control">
                                                    {
                                                        [...Array(item.stock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-2">
                                                ₹{item.price}
                                            </div>
                                            <div >
                                                <button type="button" className="btn btn-danger" onClick={() => removeFromCartHandler(item.product)}>
                                                     <i className="fa fa-close" />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )}
            </div>
            <div className="col-4">
                <div className="subtotal roundedBorder">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : ₹
                                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkoutHandler} className="btn btn-success" disabled={cartItems.length === 0}>
                                Proceed to Checkout &nbsp; <i className="fa fa-check-circle" />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
    );
}