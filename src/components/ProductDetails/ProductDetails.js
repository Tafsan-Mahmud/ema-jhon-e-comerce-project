import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {ProductKey} = useParams();
    const [product , setProduct] = useState({});
    useEffect(()=>{
        fetch('https://tranquil-sands-06135.herokuapp.com/product/'+ ProductKey)
        .then(res =>res.json())
        .then(data =>{
            setProduct(data)
        })
    },[ProductKey])
    // const findedProduct = fakeData.find(pd => pd.key === ProductKey)
    return (
        <div>
            <h2>your details.</h2>
               <Product showAddtoCartBtn={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;