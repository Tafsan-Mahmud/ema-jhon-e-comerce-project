import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';

const stripePromise = loadStripe('pk_test_51If5fJI7E0trSEhU2Sg6rHfPWFcIRP0yoS3IHyg4oGMWzx24PmTQMYCihxfoX4YCbWGFYGkNRSak3tpdOYoQzmPQ00Af6wRjfe');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
           <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
           {/* <SplitCardForm></SplitCardForm> */}
        </Elements>

    );
};

export default ProcessPayment;