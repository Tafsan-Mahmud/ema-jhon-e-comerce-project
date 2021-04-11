import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';
import Cart from '../../Cart/Cart';
import Product from '../../Product/Product';
import { Link } from 'react-router-dom';
import './Shop.css';

const Shop = () => {
    // const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    const [search, setSearch] = useState('')

    useEffect(()=>{
        fetch('https://tranquil-sands-06135.herokuapp.com/products?search='+search)
        .then(res =>res.json())
        .then(data =>setProducts(data))
    } , [search])

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        if(products.length > 0){
            const previousCart = productKeys.map(existingKey => {
                const product = products.find(pd => pd.key === existingKey)
                product.quantity = saveCart[existingKey];
                return product;
            });
            setCart(previousCart);
        }
    }, [products])


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
    const handleSearch =event=>{
        setSearch(event.target.value)
    }
    return (
        <div className="twin-container">
            <div className="products-container">
            <input  className="form-control m-3 w-50" placeholder=" search product what you need" onBlur={handleSearch} type="text"/>
                {
                    products.length === 0 && <p>Loading...</p>
                }
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