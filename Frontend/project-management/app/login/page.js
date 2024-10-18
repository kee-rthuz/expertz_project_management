// "use client";
// import { useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { useRouter } from "next/navigation";
// // import Image from 'next/image';

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//         setMessage("Please fill in all fields.");
//         return;
//     }

//     if (password.length < 6) {
//       setMessage("Password must be at least 6 characters long.");
//       return;
//     }

//     try {
//         const response = await axios.post(
//             "http://localhost:3000/api/auth/login",
//             {
//                 email,
//                 password,
//             },
//             { withCredentials: true }  // Ensure withCredentials is set correctly
//         );

//         if (response.status === 200) {
//             router.push("/dashboard");
//         } else {
//             setMessage("Login failed");
//         }
//     } catch (error) {
//         setMessage("Login failed");
//     }
// };

//   return (
//     <div className="fixed top-0 left-0 w-screen h-screen bg-[#c8d8e4] flex justify-center items-center">
//       {/* <div className="p-4">
//         <Image src="/al.jpeg" alt="Logo" width={600} height={400} />
//       </div> */}
//       <div
//         className="bg-[#fff] p-6 rounded-lg shadow-lg w-full mx-4 flex flex-col space-y-4"
//         style={{ maxWidth: "500px" }}
//       >
//         <h1 className="flex justify-center text-2xl font-bold mb-6">Login</h1>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <TextField
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             fullWidth
//             className="w-full"
//           />
//           <TextField
//             label="Password (min. 6 characters)"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             fullWidth
//             className="w-full"
//           />
//           <div className="flex justify-center">
//             <Button
//               type="submit"
//               variant="contained"
//               style={{
//                 backgroundColor: "#000",
//                 fontSize: "16px",
//                 color: "white",
//                 margin: "4px 2px",
//               }}
//             >
//               Submit
//             </Button>
//           </div>
//         </form>
//         <p className="mt-4 text-center">{message}</p>
//         <p className="mt-4 text-center">
//           Don't have an account?{" "}
//           <Link href="/signup">
//             <span className="text-blue-500 cursor-pointer">Signup</span>
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;






















"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import LoadingScreen from "../components/LoadingScreen";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [loading, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }
  
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }
  
    try {
      const payload = { email, password };
      console.log("Request payload:", payload); // Log the request payload for debugging
  
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        payload,
        { withCredentials: true }
      );
  
      console.log("Login response:", response.data); // Log the response for debugging
  
      if (response.status === 200 && response.data.email) {
        // Store email in session storage
        sessionStorage.setItem('email', response.data.email);
        console.log("Email stored:", sessionStorage.getItem('email')); // Verify storage
  
        setLoading(true);
      } else {
        setMessage("Login failed: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Login failed: " + (error.response?.data?.message || error.message));
    }
  };
  

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#c8d8e4] flex justify-center items-center">
      <div
        className="bg-[#fff] p-6 rounded-lg shadow-lg w-full mx-4 flex flex-col space-y-4"
        style={{ maxWidth: "500px" }}
      >
        <h1 className="flex justify-center text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            className="w-full"
          />
          <TextField
            label="Password (min. 6 characters)"
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
              Submit
            </Button>
          </div>
        </form>
        <p className="mt-4 text-center">{message}</p>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link href="/signup">
            <span className="text-blue-500 cursor-pointer">Signup</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
