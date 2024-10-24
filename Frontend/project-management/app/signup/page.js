"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // Initialize useRouter

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signup form submitted", {
      firstName,
      lastName,
      email,
      password,
    });

    // Simple validation
    if (!firstName || !lastName || !email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Password validation: Minimum 8 characters, at least one uppercase, one lowercase, one digit, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setMessage(
        "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/app/api/auth/signup",
        { firstName, lastName, email, password }
      );
      setMessage(response.data.message || "Signup successful");

      // Clear the form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");

      // Redirect to login page after successful signup
      router.push("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Signup failed");
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#c8d8e4] flex justify-center items-center">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full mx-4 flex flex-col space-y-4"
        style={{ maxWidth: "500px" }}
      >
        <h1 className="flex justify-center text-2xl font-bold mb-6">Signup</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <TextField
            type="text"
            label="First Name"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            type="text"
            label="Last Name"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            className="w-full"
          />
          <TextField
            label="Password (min. 8 characters, uppercase, lowercase, number, special character)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            className="w-full"
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "#000",
                fontSize: "16px",
                color: "white",
                margin: "4px 2px",
              }}
            >
              Signup
            </Button>
          </div>
        </form>
        <p className="mt-4 text-center">{message}</p>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-500 cursor-pointer">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
