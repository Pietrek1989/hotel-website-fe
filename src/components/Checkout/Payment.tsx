// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { StripeCardElement } from "@stripe/stripe-js";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { fetchCurrentReservation } from "../helperFunctions/reservationHelpers";
// import { ReservationSave } from "../../../types and interfaces";
// import Stripe from "@stripe/stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [resDetails, setResDetails] = useState({} as ReservationSave);
//   const currentReservation = useSelector(
//     (state: any) => state.newReservation.newReservation
//   );
//   const totalPrice = useSelector(
//     (state: any) => state.newReservation.totalPrice
//   );

//   useEffect(() => {
//     if (currentReservation?._id) {
//       fetchCurrentReservation(currentReservation._id)
//         .then((data) => setResDetails(data))
//         .catch((error) => console.error(error));
//     }
//   }, [currentReservation]);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const numberOfNights = Math.ceil(
//       (new Date(resDetails.content.checkin).getTime() -
//         new Date(resDetails.content.checkout).getTime()) /
//         (1000 * 3600 * 24)
//     );

//     const stripePromise = loadStripe(
//       process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!
//     );
//     const stripeInstance = await stripePromise;
//     const priceObject = await stripeInstance?.prices.create({
//       currency: "usd",
//       unit_amount: totalPrice * 100, // Price needs to be in cents
//       product_data: {
//         name: "Hotel Room",
//         description: `Hotel room for ${numberOfNights} nights`,
//       },
//     });
//     if (!stripe || !elements) {
//       return;
//     }

//     try {
//       const { error, paymentMethod } = await stripe.createPaymentMethod({
//         type: "card",
//         card: elements.getElement(CardElement) as StripeCardElement,
//         billing_details: {
//           name: `${resDetails.user.name} ${resDetails.user.surname}`,
//           email: resDetails.user.email,
//         },
//       });

//       if (error) {
//         throw new Error(error.message);
//       }

//       const response = await fetch(
//         `${process.env.REACT_APP_BE_URL}/create-checkout-session`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             line_items: [
//               {
//                 price: priceObject,
//                 quantity: 1,
//               },
//             ],
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error ${response.status}`);
//       }

//       const { sessionId } = await response.json();

//       const { error: stripeError } = await stripe.redirectToCheckout({
//         sessionId,
//       });

//       if (stripeError) {
//         throw new Error(stripeError.message);
//       }
//     } catch (error) {
//       console.error(error);
//       // Show error message to user
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Card details
//         <CardElement />
//       </label>
//       <p>Total price: {totalPrice}</p>
//       <p>Check in: {resDetails.content.checkin}</p>
//       <p>Check out: {resDetails.content.checkout}</p>
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };

export const CheckoutForm = () => {
  return <div>Hej</div>;
};
