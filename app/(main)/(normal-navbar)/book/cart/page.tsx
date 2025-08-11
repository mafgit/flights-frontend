"use client";

import useCurrencyFormatter from "@/app/hooks/useCurrencyFormatter";
import { getAutoBookingData } from "@/app/services/auth";
import { deleteCart, getCart } from "@/app/services/carts";
import BookingSegment from "@/components/booking/BookingSegment";
import Loading from "@/components/misc/Loading";
import { IBookingPassenger } from "@/types/IBookingPassenger";
import { IBookingSegment } from "@/types/IBookingSegment";
import { ISeatClass } from "@/types/ISeatClass";
import BookingStepsWrapper from "@/utils/BookingStepsWrapper";
import useAuthStore from "@/utils/useAuthStore";
import useStepStore from "@/utils/useStepStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaBan, FaTrash } from "react-icons/fa6";

const BookingStep1 = () => {
  const [cart, setCart] = useState<
    | {
        id: number;
        session_id: string;
        adults: number;
        children: number;
        infants: number;
      }
    | undefined
  >(undefined);
  const [segments, setSegments] = useState<IBookingSegment[]>([]);
  const [error, setError] = useState(false);
  const clearFormSteps = useStepStore((s) => s.clearFormSteps);
  const [loading, setLoading] = useState(true);
  const formatCurrency = useCurrencyFormatter();
  const router = useRouter();
  const goToNextStep = useStepStore((s) => s.goToNextStep);

  const setTotalAmountInStore = useStepStore((s) => s.setTotalAmount);
  const setSegmentsInStore = useStepStore((s) => s.setSegments);
  const totalAmountInStore = useStepStore((s) => s.bookingBody.total_amount);

  const setReceiptEmail = useStepStore((s) => s.setReceiptEmail);
  const receiptEmail = useStepStore((s) => s.receiptEmail);
  const passengers = useStepStore((s) => s.bookingBody.passengers);

  const userId = useAuthStore((s) => s.userId);
  const setPassengers = useStepStore((s) => s.setPassengers);
  const role = useAuthStore((s) => s.role);

  useEffect(() => {
    clearFormSteps();
    setLoading(true);
    getCart()
      .then(({ segments, cart }) => {
        setCart(cart);
        setSegments(segments);
        // setPassengers(passengers);
        setTotalAmountInStore(
          segments.reduce(
            (acc: number, prev: { segment_total_amount: number }) =>
              acc + prev.segment_total_amount,
            0
          )
        );

        setSegmentsInStore(
          segments.map(
            ({ id, seat_class }: { id: number; seat_class: ISeatClass }) => ({
              flight_id: id,
              seat_class,
            })
          )
        );
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <BookingStepsWrapper step={1}>
      <div className="py-12 flex items-center justify-center flex-col gap-12 max-w-[1250px] mx-auto">
        {loading ? (
          <Loading />
        ) : error || !segments || segments.length === 0 ? (
          <h3 className=" text-center w-max flex flex-col items-center justify-center gap-2">
            <FaBan className=" font-semibold  text-3xl" />
            <span className="font-semibold text-2xl">Empty Cart</span>
            <span className="text-lg mt-2">
              Search flights from{" "}
              <Link href="/" className="underline text-primary">
                Home
              </Link>{" "}
              and click on "Book" to add to cart.
            </span>
          </h3>
        ) : (
          <>
            <div className="flex justify-between items-center w-full px-4">
              <div className="flex items-center justify-center gap-4">
                <h2 className="text-center font-bold text-3xl">Booking Cart</h2>
                <p>
                  ({segments.length} segment{segments.length != 1 && "s"})
                </p>
                <button
                  className="bg-danger px-2 py-1 flex items-center justify-center rounded-md gap-1"
                  onClick={() => {
                    deleteCart().finally(() => {
                      window.location.reload();
                    });
                  }}
                >
                  <FaTrash className="text-sm" />
                  <span>Empty Cart</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4">
                <p className="text-3xl">{formatCurrency(totalAmountInStore)}</p>

                <button
                  onClick={() => {
                    if (goToNextStep()) {
                      if (userId && userId > 0 && role && cart) {
                        getAutoBookingData().then(
                          ({ email, passengers: defaultPassengers }) => {
                            console.log("///", defaultPassengers);

                            setReceiptEmail(email);
                            const pass: IBookingPassenger[] = [];
                            const basicPassenger: IBookingPassenger = {
                              gender: "undisclosed",
                              date_of_birth: "",
                              full_name: "",
                              nationality: "",
                              passport_number: "",
                              passenger_type: "adult",
                            };

                            for (let i = 0; i < cart.adults; i++) {
                              pass.push({
                                ...basicPassenger,
                                passenger_type: "adult",
                                i: i,
                              });
                            }

                            for (let i = 0; i < cart.children; i++) {
                              pass.push({
                                ...basicPassenger,
                                passenger_type: "child",
                                i: i + cart.adults,
                              });
                            }

                            for (let i = 0; i < cart.infants; i++) {
                              pass.push({
                                ...basicPassenger,
                                passenger_type: "infant",
                                i: i + cart.adults + cart.children,
                              });
                            }

                            const toSet: IBookingPassenger[] = [];
                            for (let i = 0; i < pass.length; i++) {
                              let idx = defaultPassengers.findIndex(
                                (p) =>
                                  p.passenger_type === pass[i].passenger_type
                              );

                              if (idx !== -1) {
                                toSet.push(defaultPassengers[idx]);
                                defaultPassengers.splice(idx, 1);
                              } else {
                                toSet.push(pass[i]);
                              }
                            }

                            setPassengers(toSet);
                            router.push("/book/passenger-info");
                          }
                        );
                      }
                    }
                  }}
                  className="relative group bg-primary-shade text-white rounded-md flex items-center justify-center gap-2 text-lg p-2 px-3 font-semibold"
                >
                  <div className="absolute w-0 h-full z-[5] rounded-md top-0 left-0 bg-foreground transition-all duration-200 group-hover:w-full"></div>
                  <FaArrowCircleRight className="z-[10] group-hover:text-primary-shade transition-all duration-200" />
                  <span className="z-[10] text-xl group-hover:text-primary-shade transition-all duration-200">
                    Proceed to Passenger Details
                  </span>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-start gap-4 w-full">
              {cart
                ? segments.map((segment) => (
                    <BookingSegment
                      formatCurrency={formatCurrency}
                      key={segment.id}
                      segment={segment}
                      passengers={{
                        adults: cart.adults,
                        children: cart.children,
                        infants: cart.infants,
                      }}
                    />
                  ))
                : null}
            </div>
          </>
        )}
      </div>
    </BookingStepsWrapper>
  );
};

export default BookingStep1;
