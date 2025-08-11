import { IRole } from "@/types/IRole";
import { AUTH_BASE_URL } from "./endpoints";
import z from "zod";
import { IBookingPassenger } from "@/types/IBookingPassenger";

export const fetchMe = async () => {
  const res = await fetch(AUTH_BASE_URL + "/me", {
    credentials: "include",
  });
  const { userId, role } = await res.json();
  return { userId, role };
};

export const logoutUser = async () => {
  try {
    const res = await fetch(AUTH_BASE_URL + "/logout", {
      method: "POST",
      credentials: "include",
    });
    const { success } = await res.json();
    return success;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const login = async (
  email: string,
  password: string
): Promise<{
  success: boolean;
  userId: number;
  role: IRole | null | undefined;
}> => {
  try {
    z.email().parse(email);
    z.string().min(6).parse(password);
    const res = await fetch(AUTH_BASE_URL + "/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return { success: false, userId: 0, role: null };
  }
};

export const signup = async (
  full_name: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<{
  success: boolean;
  userId: number;
  role: IRole | null | undefined;
}> => {
  try {
    z.email().parse(email);
    z.string().min(6).parse(password);
    z.string().min(2).parse(full_name);
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const res = await fetch(AUTH_BASE_URL + "/signup", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ full_name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return { success: false, userId: 0, role: null };
  }
};

export const getAutoBookingData = async (): Promise<{
  email: string;
  passengers: IBookingPassenger[];
}> => {
  try {
    const res = await fetch(AUTH_BASE_URL + "/auto-booking-data", {
      credentials: "include",
    });
    const {
      data: { email, passengers },
    } = await res.json();

    return {
      email,
      passengers: passengers.map((p: { date_of_birth: string }) => ({
        ...p,
        date_of_birth: p.date_of_birth.slice(0, 10),
      })),
    };
  } catch (error) {
    return { email: "", passengers: [] };
  }
};
