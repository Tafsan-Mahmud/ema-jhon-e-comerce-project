import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    const totalPrice = cart.reduce((total , prd ) =>total + prd.price,0)
    let shipping = 0;
    if(totalPrice > 300){
        shipping = 2.99;
    }
    else if(totalPrice > 15 ){
        shipping = 4.99;
    }
    else if(totalPrice > 0){
        shipping = 12.84;
    }
    const tax = (totalPrice / 5).toFixed(4);
    const grandTotal = (totalPrice + shipping + Number(tax)).toFixed(3)
    return (
        <div>
            <h2>Order Summary</h2>
            <h5>Items ordered:{cart.length}</h5>
            <p>Shipping: {shipping}</p>
            <p>Tax + VAT : {tax}</p>
            <h4>Total Price : {grandTotal}</h4>
        </div>
    );
};

export default Cart;