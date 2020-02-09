import React from "react"
import StripeCheckout from "react-stripe-checkout"
import axios from 'axios'

const StripeButton = ({ price }) => {
  const priceInCent = price * 100
  const publishableKey = "pk_test_r9CLwWdH2qBUd3Dx4IgRFPWh"

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'POST',
      data: {
        amount: priceInCent,
        token
      }
    }).then(res => {
      alert('Payment Success!')
    }).catch(error => {
      console.log('Payment error: ', JSON.parse(error))
      alert('There was an issue with your payment.')
    })
  }

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing"
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceInCent}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeButton