import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="container">
      <h1>Order ID: {order._id}</h1>
      <div className="">
        <div className="col-12">
          <ul>
            <li>
              <div className="row roundedBorder">
                <h2>Shipping Details</h2>
                <div className="col-12">
                  <p>
                    <strong>Name: </strong> {order.shippingAddress.fullName}
                    <br />
                    <strong>Address: </strong> {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}, {order.shippingAddress.PIN},{" "}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <MessageBox variant="success">
                      Delivered at {order.deliveredAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Delivered</MessageBox>
                  )}
                </div>
              </div>
            </li>
            <li>
              <div className="row roundedBorder">
                <h2>Payment Details</h2>
                <div className="col-12">
                    <p>
                    <strong>Payment: </strong> {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                    <MessageBox variant="success">
                        Paid at {order.paidAt}
                    </MessageBox>
                    ) : (
                    <MessageBox variant="danger">Not Paid</MessageBox>
                    )}
                </div>
               
              </div>
            </li>
            <li>
            
              <div className="row roundedBorder">
              <h2>Order</h2>
                <div className="col-12">
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div className="col-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="col-4">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div  className="col-4">
                          {item.qty} x ₹{item.price} = <strong>₹{item.qty * item.price}</strong>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                </div>
                
              </div>
            </li>
          </ul>
        </div>
        <br></br>
        <div className="col-12">
          <div className="row roundedBorder">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div className="col-6">Items</div>
                  <div className="col-4">₹{order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-6">Shipping</div>
                  <div className="col-4">₹{order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-6">GST</div>
                  <div className="col-4">₹{order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-6">
                    <strong>Order Total</strong>
                  </div>
                  <div className="col-4">
                    <strong>₹{order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
