"use client";
import { useState } from "react";
import FormField from "./FormField";
import Button from "./Button";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  return (
    <form>
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

      <Button text="Submit" type="submit" />

      <div className="">
        <p>{isSignup ? "Already signed up?" : "Haven't signed up yet?"}</p>
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Login" : "Signup"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
