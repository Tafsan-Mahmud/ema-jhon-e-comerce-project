import React, { useEffect, useState } from 'react';
import fakeData from '../../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';
import Cart from '../../Cart/Cart';
import Product from '../../Product/Product';
import { Link } from 'react-router-dom';
import './Shop.css';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([])


    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey)
            product.quantity = saveCart[existingKey];
            return product;
        });
        setCart(previousCart);
    }, [])


    const handleAddProduct = (pd) => {
        const toBeAded = pd.key;
        const sameProduct = cart.find(product => product.key === toBeAded)
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1
            sameProduct.quantity = count
            const others = cart.filter(pd => pd.key !== toBeAded);
            newCart = [...others, sameProduct];
        }
        else {
            pd.quantity = 1
            newCart = [...cart, pd]
        }
        setCart(newCart)
        addToDatabaseCart(pd.key, count)
    }
    return (
        <div className="twin-container">
            <div className="products-container">
                {
                    products.map(pd => <Product showAddtoCartBtn={true} product={pd} key={pd.key} handleAdd={handleAddProduct}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/Order">
                        <button className="btn-custom-cart">Review Order</button>
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;