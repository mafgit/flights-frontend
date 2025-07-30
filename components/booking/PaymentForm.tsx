import useStepStore from "@/utils/useStepStore";
import React, { ChangeEvent, FormEvent, useState } from "react";
import z from "zod";
import { FaArrowCircleRight } from "react-icons/fa";
import Separator from "@/components/misc/Separator";
import { useRouter } from "next/navigation";
import { countries } from "@/utils/countryList";

const PaymentForm = ({}: {}) => {
  const [formData, setFormData] = useState({
    holder_name: "",
    card_number: "",
    expiry_year: 2030,
    expiry_month: 1,
    cvv: "",
    billing_address: "",
    country: "AF",
    city: "Kabul",
    zip: "",
  });
  const router = useRouter();
  const goToNextStep = useStepStore((s) => s.goToNextStep);
  const setBookedBookingId = useStepStore((s) => s.setBookedBookingId);

  const updateFormData = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let body = {
      ...formData,
      expiry_month: Number(formData.expiry_month),
      expiry_year: Number(formData.expiry_year),
    };

    const schema = z
      .object({
        holder_name: z.string().min(2).max(40),
        card_number: z.string(),
        expiry_month: z.number().int().min(1).max(12),
        expiry_year: z.number().int().min(new Date().getFullYear()),
        cvv: z.string().min(3).max(4),
      })
      .refine(({ expiry_month, expiry_year }) => {
        return (
          new Date(expiry_year, expiry_month).getTime() >
          Date.now() + 1000 * 3600 * 25
        );
      });

    // --------------- validation --------------
    schema.parse(body);
    // ------------------------------------------

    if (goToNextStep()) {
      // todo: payment
      setBookedBookingId(3);
      router.replace("/book/congratulations");
    }
  };

  return (
    <form className="bg-foreground-opposite p-5 py-8 mt-8 rounded-lg mx-auto max-w-[550px]">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="holder_name">Card Holder Name</label>
          <input
            name="holder_name"
            placeholder="Enter exact name"
            autoComplete="cc-name"
            required={true}
            onChange={(e) => updateFormData(e)}
            value={formData.holder_name || ""}
            className="bg-foreground text-background px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="card_number">Card Number</label>
          <input
            name="card_number"
            placeholder="Enter card number"
            onChange={(e) => updateFormData(e)}
            required
            type="number"
            value={formData.card_number || ""}
            autoComplete="cc-number"
            className="bg-foreground text-background px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="expiry_month">Expiry (mm/yyyy)</label>
          <div className="flex items-center justify-between">
            <input
              name="expiry_month"
              type="number"
              max={12}
              min={1}
              autoComplete="cc-exp-month"
              placeholder="Enter expiry date of your card"
              onChange={(e) => updateFormData(e)}
              value={formData.expiry_month}
              required
              className="w-[50px] bg-foreground text-background px-3 py-2 rounded-md"
            />
            <span className="text-2xl text-gray-300">/</span>
            <input
              name="expiry_year"
              required
              type="number"
              min={new Date().getFullYear()}
              autoComplete="cc-exp-year"
              placeholder="Enter expiry date of your card"
              onChange={(e) => updateFormData(e)}
              value={formData.expiry_year}
              className="w-[154px] bg-foreground text-background px-3 py-2 rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="cvv">CVV</label>
          <input
            name="cvv"
            autoComplete="cc-csc"
            type="number"
            required
            placeholder="Enter CVV number of card"
            onChange={(e) => updateFormData(e)}
            value={formData.cvv || ""}
            className="bg-foreground text-background px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="zip">Zip</label>
          <input
            name="zip"
            placeholder="Enter billing address"
            autoComplete="postal-code"
            required
            type="number"
            onChange={(e) => updateFormData(e)}
            value={formData.zip || ""}
            className="bg-foreground text-background px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="billing_address">Billing Address</label>
          <input
            name="billing_address"
            placeholder="Enter billing address"
            autoComplete="billing address-line1"
            required
            onChange={(e) => updateFormData(e)}
            value={formData.billing_address || ""}
            className="bg-foreground text-background px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="country">Country</label>
          <select
            name="country"
            required
            value={formData.country}
            onChange={(e) => updateFormData(e)}
            className="bg-foreground text-background px-3 py-2 rounded-md"
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="city">City</label>
          <input
            name="city"
            placeholder="Enter exact name"
            // autoComplete=
            required
            onChange={(e) => updateFormData(e)}
            value={formData.city || ""}
            className="bg-foreground text-background px-3 py-2 rounded-md"
          />
        </div>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full mt-8 relative group bg-primary-shade text-white rounded-md flex items-center justify-center gap-2 text-lg p-2 px-3 font-semibold"
      >
        <div className="absolute w-0 h-full z-[5] rounded-md top-0 left-0 bg-foreground transition-all duration-200 group-hover:w-full"></div>
        <FaArrowCircleRight className="z-[10] group-hover:text-primary-shade transition-all duration-200" />
        <span className="z-[10] text-xl group-hover:text-primary-shade transition-all duration-200">
          Confirm Payment
        </span>
      </button>
    </form>
  );
};

export default PaymentForm;
