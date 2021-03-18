import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyOrder from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart , setCart] = useState([]);
    const [placeOrder ,  setPlaceOrder] =useState(false);
    const history = useHistory();
 const handleProceedCheckout = () =>{
    history.push('/shipment')
    // setCart([]);
    // setPlaceOrder(true);
    // processOrder();
 }
    const removeProduct = (ProductKey) =>{
        const newCart = cart.filter(pd => pd.key !== ProductKey)
        setCart(newCart);
        removeFromDatabaseCart(ProductKey)
    }
    useEffect(()=>{
        const savedCart = getDatabaseCart()
       const productKeys = Object.keys(savedCart);
       const cartProducts = productKeys.map(key => {
           const product = fakeData.find(pd => pd.key === key)
           product.quantity = savedCart[key];
           return product;
       });
       console.log(cartProducts);
       setCart(cartProducts)
    },[]);
    let thankYou;
    if(placeOrder){
        thankYou = <img src={happyOrder} alt=""/>
    }
    return (
        <div className="twin-container">
            <div className="products-container">
                    {
                        cart.map(pd => <ReviewItem removePeodect={removeProduct}  product={pd}></ReviewItem>)
                    }
                    { thankYou } 
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="btn-custom-cart">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;