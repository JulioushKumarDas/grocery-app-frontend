import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

export default function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }
    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 200 ? toPrice(0) : toPrice(30);
    cart.taxPrice = toPrice(0.10 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };
    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="container">
                <div className="col-12">
                    <ul>
                        <li>
                        <h2>Shipping Details</h2>
                            <div className="row roundedBorder">

                                <div className="col-6">
                                    <p>
                                        <strong>Name: </strong> {cart.shippingAddress.fullName}<br />
                                        <strong>Address: </strong> {cart.shippingAddress.address}, {' '}
                                        {cart.shippingAddress.city},{' '} {cart.shippingAddress.PIN},{' '}
                                        {cart.shippingAddress.country}
                                    </p>
                                </div>
                                
                            </div>
                        </li>
                        <hr />
                        <li>
                            <h2>Payment Details</h2>
                            <div className="row roundedBorder">
                                <div className="col-6">
                                    <p>
                                        <strong>Payment: </strong> {cart.paymentMethod}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <hr />
                        <li>
                            <h2>Order</h2>
                            <div className="row roundedBorder">
                                <div className="col-12">
                                    <ul>
                                        {
                                            cart.cartItems.map((item) => (
                                                <li key={item.product}>
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <img src={item.image} alt={item.name} className="small"></img>
                                                        </div>
                                                        <div className="col-6">
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </div>
                                                        <div className="col-2">
                                                            {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>

                        </li>
                        <hr />
                    </ul>
                </div>
                <div className="col-12">
                    <div className="row roundedBorder">
                        <ul>
                            <h2>Order Summary</h2>
                            <li>
                                
                            </li>
                            <li>
                                <div className="row">
                                    <div className="col-4">Items</div>
                                    <div className="col-4">₹{cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div className="col-4">Shipping</div>
                                    <div className="col-4">₹{cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div className="col-4">GST</div>
                                    <div className="col-4">₹{cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div className="col-4"><strong>Order Total</strong></div>
                                    <div className="col-4"><strong>₹{cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick={placeOrderHandler} className="primary block" disabled={cart.cartItems.length === 0}>
                                    Place Order
                                </button>
                            </li>
                            {
                                loading && <LoadingBox></LoadingBox>
                            }
                            {
                                error && <MessageBox variant="danger">{error}</MessageBox>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
