import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const {name , quantity , key , price ,img} = props.product
    return (
        <div className="review">
            <div className="">
                <img src={img} alt=""/>
            </div>
            <div className="gap">
            <h3>{name}</h3>
            <h2> Quantity : {quantity}</h2>
            <p>$ {price}</p>
            <button 
            onClick={()=> props.removeProduct(key)}
            className="btn-custom-cart"
            >Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;