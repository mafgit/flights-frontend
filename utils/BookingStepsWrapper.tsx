"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import useStepStore from "./useStepStore";
import Loading from "@/components/misc/Loading";

const BookingStepsWrapper = ({
  step: triedToVisitStep,
  children,
}: {
  step: number;
  children: ReactNode;
}) => {
  const router = useRouter();
  const currentFormStep = useStepStore((s) => s.currentFormStep);

  const isValidStep = () => {
    // console.log("triedToVisit", triedToVisitStep);

    return (
      currentFormStep === triedToVisitStep ||
      Math.abs(triedToVisitStep - currentFormStep) === 1
    );

    // return (
    //   triedToVisitStep > 0 &&
    //   triedToVisitStep < 5 &&
    //   (triedToVisitStep === 1 ||
    //     formStepsCompleted.includes(triedToVisitStep - 1))
    // );
  };

  useEffect(() => {
    // todo: check why it is sometimes going too much back
    // if (false) {
    if (!isValidStep()) {
      router.replace("/book/cart");
    }
  }, [triedToVisitStep]);

  return isValidStep() ? (
    children
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <Loading />
    </div>
  );
};

export default BookingStepsWrapper;
