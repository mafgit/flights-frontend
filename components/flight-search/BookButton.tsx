"use client";
import { addCart } from "@/app/services/carts";
import { FaCreditCard } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { ISearchResult } from "@/types/ISearchResult";
import { IPassengersSelectedOption } from "@/types/IPassengersSelectedOption";

const BookButton = ({
  result,
  passengers,
}: {
  result: ISearchResult[];
  passengers: IPassengersSelectedOption;
}) => {
  const router = useRouter();

  return (
    <button
      className="relative bg-primary-shade rounded-md p-2 w-full group flex items-center justify-center"
      onClick={async () => {
        await addCart(
          result.map((r) => ({ flightId: r.id, seatClass: r.seat_class })),
          passengers
        );

        router.push("/book/cart");
      }}
    >
      <div className="top-0 left-0 absolute h-full bg-foreground rounded-md z-[5] w-0 transition-all duration-200 group-hover:w-full"></div>
      <p className="z-[10] transition-all duration-200 group-hover:text-primary-shade flex items-center justify-center gap-[5px]">
        <FaCreditCard /> <span>Book</span>
      </p>
    </button>
  );
};

export default BookButton;
