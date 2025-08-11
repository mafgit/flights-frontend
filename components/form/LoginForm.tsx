"use client";
import { FormEvent, useState } from "react";
import FormField from "./FormField";
import { FaLockOpen } from "react-icons/fa6";
import { login, signup } from "@/app/services/auth";
import useAuthStore from "@/utils/useAuthStore";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let data;
    if (isSignup) {
      data = await signup(fullName, email, password, confirmPassword);
    } else {
      data = await login(email, password);
    }

    if (!data.success || data.userId <= 0 || !data.role) {
      return;
    }

    setUser(data.userId, data.role);
    router.replace("/"); // todo?: or go back if history available
    window.location.reload();
  };

  return (
    <form
      className="flex flex-col gap-3 bg-foreground-opposite p-4 rounded-md w-[300px]"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center text-2xl font-bold">Flight Booker</h2>
      {isSignup && (
        <FormField
          label="Full Name"
          type="text"
          id="full-name"
          placeholder="Enter your full name"
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
        />
      )}

      <FormField
        label="Email"
        type="email"
        id="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <FormField
        label="Password"
        type="password"
        id="password"
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      {isSignup && (
        <FormField
          label="Confirm Password"
          type="password"
          id="confirm-password"
          placeholder="Repeat your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
      )}
      <button
        className="relative bg-primary-shade rounded-md p-2 w-full group flex items-center justify-center"
        onClick={() => {}}
      >
        <div className="top-0 left-0 absolute h-full bg-foreground rounded-md z-[5] w-0 transition-all duration-200 group-hover:w-full"></div>
        <p className="z-[10] transition-all duration-200 group-hover:text-primary-shade flex items-center justify-center gap-[5px]">
          <FaLockOpen /> <span>{isSignup ? "Sign up" : "Login"}</span>
        </p>
      </button>

      <div className="text-center">
        <p className="inline">
          {isSignup ? "Already signed up?" : "Haven't signed up yet?"}
        </p>{" "}
        <button
          className="text-primary inline"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Login" : "Signup"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
