import React from 'react';
import fakeData from '../../fakeData';

const Manage = () => {
const handleAddProduct =()=>{
    const product = {}
    fetch('https://tranquil-sands-06135.herokuapp.com/addProduct',{
        method:'POST' ,
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(fakeData)
    })
    console.log('click')
}
    return (
        <div>
            <form action="">
                <p><span>name</span><input type="text"/></p>
                <p><span>price</span><input type="text"/></p>
                <p><span>quantity</span><input type="text"/></p>
                <p><span>product image</span><input type="file"/></p>
              <button onClick={handleAddProduct}>add Product</button>
            </form>
        </div>
    );
};

export default Manage;