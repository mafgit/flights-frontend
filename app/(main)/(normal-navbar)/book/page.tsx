"use client";

import { getCart } from "@/app/services/carts";
import BookingSegment from "@/components/booking/BookingSegment";
import Loading from "@/components/misc/Loading";
import { IBookingPassenger } from "@/types/IBookingPassenger";
import { IBookingSegment } from "@/types/IBookingSegment";
import { useEffect, useState } from "react";
import { FaBan } from "react-icons/fa6";

const BookingPage = () => {
  const [cart, setCart] = useState<
    { id: number; session_id: string } | undefined
  >(undefined);
  const [segments, setSegments] = useState<IBookingSegment[]>([]);
  const [error, setError] = useState(false);
  const [passengers, setPassengers] = useState<
    IBookingPassenger[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCart()
      .then(({ segments, passengers, cart }) => {
        setCart(cart);
        setSegments(segments);
        setPassengers(passengers);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <h3 className="text-2xl font-semibold text-center w-max flex items-center justify-center gap-2">
          <FaBan className="text-3xl" />
          <span>Empty Cart</span>
        </h3>
      ) : (
        <>
          <h2>Booking Cart</h2>

          {segments.map((segment) => (
            <BookingSegment key={segment.id} segment={segment} />
          ))}
        </>
      )}
    </div>
  );
};

export default BookingPage;
