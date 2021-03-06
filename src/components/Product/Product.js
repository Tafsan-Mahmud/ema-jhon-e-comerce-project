import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css';
const Product = (props) => {
    // console.log(props.product.img)
    const { img, name, seller, price, stock } = props.product
    return (
        <div className="product">
            <div className="img-div">
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <p><small>by : P{seller}</small></p>
                <p><small>${price}</small></p>
                <p><small>only {stock} left in stock - order soon</small></p>
                <button className="btn-custom" onClick={()=>props.handleAdd(props.product)}> <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>

        </div>
    );
};

export default Product;