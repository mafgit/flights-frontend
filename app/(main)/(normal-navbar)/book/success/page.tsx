"use client";

import useCurrencyFormatter from "@/app/hooks/useCurrencyFormatter";
import Loading from "@/components/misc/Loading";
import Separator from "@/components/misc/Separator";
import BookingStepsWrapper from "@/utils/BookingStepsWrapper";
import useStepStore from "@/utils/useStepStore";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const SuccessPage = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const router = useRouter();
  const [status, setStatus] = useState("loading");
  const formatCurrency = useCurrencyFormatter();
  const [details, setDetails] = useState<{
    booking_id: number;
    receipt_email: string;
    amount: number;
    currency: string;
  }>({ booking_id: 0, receipt_email: "", amount: 0, currency: "" });

  // const clearFormSteps = useStepStore((s) => s.clearFormSteps);
  // const bookedBookingId = useStepStore((s) => s.bookedBookingId);

  // useEffect(() => {
  //   return () => {
  //     clearFormSteps();
  //     // todo: check
  //   };
  // }, []);

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        console.log("paymentIntent", paymentIntent);
        if (paymentIntent) {
          setDetails({
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency,
            receipt_email: paymentIntent.receipt_email as string,
            booking_id: parseInt(
              (paymentIntent as any).metadata?.booking_id || 0
            ),
          });
          setStatus(paymentIntent.status);
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
      });
  }, [stripe, clientSecret]);

  useEffect(() => {
    console.log(status);
  }, [status]);

  if (status === "loading") return <Loading />;

  return (
    <div className="py-8 flex items-center justify-center">
      <div className="p-6 bg-foreground-opposite rounded-lg flex flex-col gap-3 text-center">
        {status === "succeeded" ? (
          <>
            <h2 className="gap-2 font-bold flex flex-col">
              <span className="text-primary text-3xl">Success!</span>{" "}
              <span className="text-xl">Your booking is confirmed</span>
            </h2>

            <Separator horizontal />

            <div className="flex flex-col gap-2 text-lg">
              <div className="font-semibold flex justify-between items-center">
                <p>Booking ID:</p>
                <p className="text-primary">{details.booking_id}</p>
              </div>

              <div className="font-semibold flex justify-between items-center">
                <p>Receipt Email:</p>
                <p className="text-primary">{details.receipt_email}</p>
              </div>

              <div className="font-semibold flex justify-between items-center">
                <p>Total Amount:</p>
                <p className="text-primary">{formatCurrency(details.amount)}</p>
              </div>
            </div>

            <Separator horizontal />

            <div className="text-lg flex flex-col gap-3">
              <p>Booking details are sent to your email</p>
              <div className="flex flex-col gap-2">
                <p>You can check your booking here</p>
                <Link
                  href={"/track?id=" + details.booking_id}
                  className="bg-primary-shade text-lg text-foreground p-2 rounded-md w-full"
                >
                  Track Booking
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <h2 className="text-2xl font-bold">
              <span className="text-danger">Failure!</span>{" "}
              <span>Your booking has failed</span>
            </h2>
            <p>Payment status: {status}</p>
          </>
        )}

        <Separator horizontal />

        <div className="">
          <p>Contact Support:</p>
          <p className="text-primary">+91 9876543210</p>
          <a href="mailto:asd@asd.asd" className="text-primary">
            asd@asd.asd
          </a>
        </div>
      </div>
    </div>
  );

  // <div className="py-8 flex items-center justify-center">
  //   <div className="bg-foreground-opposite p-8 rounded-lg mx-auto max-w-[500px] flex items-center justify-center flex-col text-center gap-4">
  //     <h1 className="text-3xl font-bold">
  //       <span className="text-primary">Congratulations!</span> Your booking is
  //       confirmed!
  //     </h1>
  //     <p className="text-lg">
  //       Your booking id:{" "}
  //       <span className=" bg-blue-500 p-2 rounded-md">{bookedBookingId}</span>
  //     </p>
  //     <li className="text-lg list-disc self-start text-left">
  //       Details are sent to your email{" "}
  //       <span className=" bg-blue-500 p-2 rounded-md">abcd@abcd.com</span>
  //     </li>
  //     <li className="text-lg  list-disc self-start text-left">
  //       You can track your booking here using your booking id:
  //     </li>
  //     <Link
  //       href={"/track/" + bookedBookingId}
  //       className="bg-primary-shade text-lg text-foreground p-2 rounded-md w-full"
  //     >
  //       Track Booking
  //     </Link>
  //   </div>
  // </div>
  // );
};

const SuccessPageWrapper = () => {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get("payment_intent_client_secret");

  return clientSecret ? (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <SuccessPage clientSecret={clientSecret} />
    </Elements>
  ) : (
    <p>No secret</p>
  );
};

export default SuccessPageWrapper;
