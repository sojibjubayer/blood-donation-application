import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState()
  const axiosSecure = useAxiosSecure()
  const [donationAmount, setDonationAmount] = useState(0)
  const [clientSecret, setClientSecret] = useState('')
  const { user } = useAuth()
  const [transactionId, setTransactionId] = useState('')



  const handleDonation = e => {
    e.preventDefault();
    const donation = e.target.value;
    setDonationAmount(donation)


  }


  useEffect(() => {
    if (donationAmount > 0) {

      axiosSecure.post('/create-payment-intent', { donation: donationAmount })
        .then(res => {
          console.log(res.data.clientSecret)
          setClientSecret(res.data.clientSecret)
        })
    }
  }, [axiosSecure, donationAmount])




  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {


      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }


    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setError(error.message)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setError('')
    }

    // confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous'
        }
      }

    })
    if (confirmError) {
      console.log('confirm error:', confirmError)
    }

    else {
      console.log('payment Intent:', paymentIntent)
      if (paymentIntent.status === 'succeeded') {
        console.log(' transaction id', paymentIntent.id)
        setTransactionId(paymentIntent.id)


        const payment = {
          email: user?.email,
          donation: donationAmount,
          transactionId: paymentIntent.id,
          date: new Date(),
          status: 'pending'
        }
        const res = await axiosSecure.post('/payments', payment)
        console.log('payment saved:', res.data)

        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Donation Successfull",
            showConfirmButton: false,
            timer: 1300
          });
          

        }
      }
    }

  };


  return (
    <div className='min-h-screen pt-24'>
      <form onChange={handleDonation} className='flex flex-col justify-center items-center my-5'>
        <label className='text-lg md:text-xl font-semibold mr-3'>Enter Donation Amount </label>
        <input className='border border-green-400 rounded w-28 p-1 mt-3' type="number" name="donation" required/>
      </form>
      <form onSubmit={handleSubmit} className=''>
        <CardElement className='ml-2 border-2 p-2'
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <div className='flex flex-col md:flex-row gap-5 items-center mt-10'>
          <button className='btn btn-sm btn-primary   ml-2' type="submit" disabled={!stripe || !donationAmount}>
            Pay
          </button>
          <p className='text-red-600 '>{error}</p>
          <div >
            {
              transactionId && <p className='bg-blue-400 text-sm  font-semibold  text-black p-2 rounded-md text-center'>Your Transaction Id: {transactionId}</p>
            }
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;