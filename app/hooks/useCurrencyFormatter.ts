"use client";

import useAuthStore from "@/utils/useAuthStore";

const useCurrencyFormatter = () => {
  const currency = useAuthStore((s) => s.currency);

  return (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount);
  // todo: currency conversion here or server
};

export default useCurrencyFormatter;
