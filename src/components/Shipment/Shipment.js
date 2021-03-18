import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContex } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const [logedInUser, setLogedInUser] = useContext(userContex)
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
  
    console.log(watch("example"));
  
    return (
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
    );
};

export default Shipment;