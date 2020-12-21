import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
    toast.success("Added to Cart !");
  };

  

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to Home Screen</Link>
          
          <div className="row top">
            <div className="col-6">
              <img className="large" src={product.image} alt={product.name} />
            </div>
            <div className="col-6">
              <div className="row">
                <ul>
                  <li>
                    <h1>{product.name}</h1>
                  </li>
                  {/* <li>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    ></Rating>
                  </li> */}
                 
                  <li className="price"><h3>Price : ₹{product.price}</h3></li>
                  <li>
                    <strong>Description:</strong>
                    <p>{product.description}</p>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="row">
                <div className="subtotal">
                  <ul>
                    {/* <li>
                      <div className="">
                        <div>Price</div>
                        <div className="price">₹{product.price}</div>
                      </div>
                    </li> */}
                    <li>
                      <div className="">
                        <div>Status</div>
                        <div>
                          {product.stock > 0 ? (
                            <span className="inStock">In Stock</span>
                          ) : (
                            <span className="danger">Out of Stock</span>
                          )}
                        </div>
                      </div>
                    </li>
                    {product.stock > 0 && (
                      <>
                        <li>
                          <div className="">
                            <div>Qty</div>
                            <div>
                              <select
                                value={qty}
                                onChange={(e) => setQty(e.target.value)} 
                                className="form-control"
                              >
                                {[...Array(product.stock).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </li>
                        <li>
                          <button
                            onClick={addToCartHandler}
                            className="btn btn-success"
                          > 
                              Add to Cart &nbsp;<i className="fa fa-cart-plus" />
                          </button>
                          <ToastContainer />
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
