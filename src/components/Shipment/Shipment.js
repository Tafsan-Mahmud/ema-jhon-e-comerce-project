import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userContex } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';

const Shipment = () => {
  const [logedInUser, setLogedInUser] = useContext(userContex)
  const [shippingData, setShippingData] = useState(null)
  console.log(shippingData);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    setShippingData(data)
    console.log(data);
  };

  const paymentSuccess = paymentId => {
    const saveCart = getDatabaseCart();
    const orderDetails = { ...logedInUser, products: saveCart, paymentId, shipment: shippingData, orderTime: new Date() }
    fetch('https://tranquil-sands-06135.herokuapp.com/addOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert('your order placed successfully')
        }
      })
  }
  console.log(watch("example"));

  return (
    <div className="row">
      <div style={{display: shippingData ? 'none':'block'}} className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input name="name" defaultValue={logedInUser.name} ref={register({ required: true })} />
          {errors.name && <span className="error">name is required</span>}

          <input name="email" defaultValue={logedInUser.email} ref={register({ required: true })} />
          {errors.email && <span className="error">email is required</span>}

          <input name="address" placeholder="your address" ref={register({ required: true })} />
          {errors.address && <span className="error">address is required</span>}

          <input name="phnNmbr" placeholder="your phone number" ref={register({ required: true })} />
          {errors.phnNmbr && <span className="error">phone number is required</span>}

          <input type="submit" />
        </form>
      </div>
      <div style={{display: shippingData ? 'block':'none'}} className="col-md-6">
        <h1>this is for pay</h1>
        <ProcessPayment handlePayment={paymentSuccess}></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipment;