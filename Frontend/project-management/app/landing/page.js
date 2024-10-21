// import Head from 'next/head';
// import Image from 'next/image';
// import googleIcon from '../../public/google.png'
// import googleIc from '../../public/p.jpg'
// import googleIco from '../../public/h2.jpeg'

// export default function Home() {
//   return (
//     <div className="relative min-h-screen">
//       {/* Background image container */}
//       <div className="fixed inset-0 w-full h-full bg-white">
//         {/* <Image 
//           src={googleIco} 
//           alt="Background" 
//           layout="fill"
//           objectFit="cover"
//           quality={100}
//           priority
//         /> */}
//       </div>

//       {/* Content wrapper */}
//       <div className="relative z-10 min-h-screen">


//         <header className="flex justify-end items-center p-4">
//           <div>
//             <button className="px-4 py-2 font-bold mr-2 bg-gray-200 rounded hover:bg-gray-300 transition">Login</button>
//           </div>
//         </header>

//         <main className="flex flex-col md:flex-row items-center justify-between px-4 py-12 max-w-7xl mx-auto">
            
//         <div>
//             <Image src={googleIc} alt="Google" width={900} height={14} className="mr-2" />        
//           </div>
//           <div className="md:w-1/2 mb-8 md:mb-0">
//             <h1 className="text-4xl font-bold mb-4 text-[#000]">The first truly intelligent Project Management</h1>
//             <form className="flex flex-col sm:flex-row mb-4">
//               <input 
//                 type="email" 
//                 placeholder="Email Address" 
//                 className="flex-grow p-2 rounded-l border focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button className="bg-indigo-600 text-white p-2 rounded-r hover:bg-indigo-700 transition">
//                 Start Now!
//               </button>
//             </form>

//             <div>
//             <button className="px-8 font-bold py-4 mr-2 bg-gray-200 rounded hover:bg-gray-300 transition">Sign up</button>
//           </div>
       
//             {/* <div className="flex mt-4">
//               <button className="flex items-center mr-4 border p-2 rounded hover:bg-gray-100 transition">
//                 <Image src={googleIcon} alt="Google" width={14} height={14} className="mr-2" />        
//                 Sign up with Google
//               </button>
//             </div> */}

//           </div>
//           {/* <div>
//             <Image src={googleIc} alt="Google" width={900} height={14} className="mr-2" />        
//           </div> */}
//         </main>
//       </div>
//     </div>
//   );
// }







'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import googleIc from '../../public/t.png';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Email submitted:', email);

    // Check authentication status and redirect accordingly
    const tokenPresent = false; // Replace with your actual token check logic
    if (tokenPresent) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleSignupClick = () => {
    router.push('/signup');
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 w-full h-full bg-white">
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 min-h-screen">
        <header className="flex justify-end items-center p-4">
          <div>
            <button
              onClick={handleLoginClick}
              className="px-8 py-3 font-bold mr-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              Login
            </button>
          </div>
        </header>

        <main className="flex flex-col md:flex-row min-h-screen px-4 md:px-8">
          {/* image update */}
          <div className="w-[1000px] order-2 md:order-1 -ml-64 mt-16">
            <Image
              src={googleIc}
              alt="Google"
              width={900}
              height={14}
              className="w-full h-[60vh] object-contain"
            />
          </div>

          {/* input */}
          <div className="md:w-[600px] mt-56 order-1 md:order-2">
            <h1 className="text-4xl font-bold mb-4 text-[#000]">
              The first truly intelligent Project Management
            </h1>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
              <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-[#607aae] to-white h-[7vh] rounded-[30px] shadow-lg">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address "
                  className="flex-1 px-4 py-2 bg-transparent outline-none text-black placeholder:text-gray-700"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 text-white mr-2 font-semibold bg-[#8AD1DA] rounded-[30px] hover:bg-indigo-700 transition-colors"
                >
                  Start Now!
                </button>
              </div>
            </form>

            <div className="mt-4">
              <button
                onClick={handleSignupClick}
                className="px-8 font-bold py-4 mr-2 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                Sign up
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

