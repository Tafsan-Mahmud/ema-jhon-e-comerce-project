import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {ProductKey} = useParams();
    const findedProduct = fakeData.find(pd => pd.key === ProductKey)
    return (
        <div>
            <h2>your details.</h2>
            <Product showAddtoCartBtn={false} product={findedProduct}></Product>
        </div>
    );
};

export default ProductDetails;