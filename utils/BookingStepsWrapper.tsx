"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import useStepStore from "./useStepStore";

const BookingStepsWrapper = ({
  step: triedToVisitStep,
  children,
}: {
  step: number;
  children: ReactNode;
}) => {
  const router = useRouter();
  const formStepsCompleted = useStepStore((s) => s.formStepsCompleted);

  const isValidStep = () => {
    // console.log("triedToVisit", triedToVisitStep);
    // console.log(
    //   "allowed",
    //   triedToVisitStep === 1 ||
    //     formStepsCompleted.includes(triedToVisitStep - 1)
    // );

    return (
      triedToVisitStep > 0 &&
      triedToVisitStep < 5 &&
      (triedToVisitStep === 1 ||
        formStepsCompleted.includes(triedToVisitStep - 1))
    );
  };
  useEffect(() => {
    // todo: check why it is sometimes going too much back
    if (!isValidStep()) {
      router.back();
    }
  }, [triedToVisitStep]);

  return true ? children : <></>;
};

export default BookingStepsWrapper;
