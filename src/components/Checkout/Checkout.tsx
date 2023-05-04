// import { loadStripe } from "@stripe/stripe-js";
// import { useSelector } from "react-redux";
// // import { Elements } from "@stripe/react-stripe-js";
// // import Payment from "./Payment";
// // const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);
// import StripeCheckout from "react-stripe-checkout";

// const Checkout = () => {
//   const totalPrice = useSelector(
//     (state: any) => state.newReservation.totalPrice
//   );

//   function onToken(token: any) {
//     console.log(token);
//   }
//   return (
//     // <Elements stripe={stripePromise}>
//     //   <Payment />
//     // </Elements>
//     <StripeCheckout
//       amount={totalPrice * 100}
//       token={onToken}
//       currency="EUR"
//       stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!}
//     > </StripeCheckout>
//   );
// };

// export default Checkout;

export const Checkout = () => {
  return <div>hej</div>;
};
