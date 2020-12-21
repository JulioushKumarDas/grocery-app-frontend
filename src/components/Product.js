import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
    const {product} = props;
    return (
        <div key={product._id} className="card mb-3">
            <div className="justify-content-center">
            <Link to={`/product/${product._id}`}>
                <img className="card-img-top medium" src={product.image} alt={product.name}/>
            </Link> 
            </div>
                
            <div className="card-content">
                <Link to={`/product/${product._id}`}>
                    <h4 className="card-title">{product.name}</h4>
                </Link>
                {/* <Rating rating={product.rating} numReviews={product.numReviews}></Rating> */}
                <p className="card-content price">₹{product.price}</p>
                
            </div>
         </div>
    );
}

