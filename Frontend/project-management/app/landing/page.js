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
      <div className="fixed inset-0 w-full h-full bg-">
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="flex justify-end items-center p-4">
          <div>
            <button
              onClick={handleLoginClick}
              className="px-4 sm:px-8 py-2 sm:py-3 font-bold mr-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              Login
            </button>
          </div>
        </header>

        <main className="flex flex-col md:flex-row flex-grow px-4 md:px-8 items-center justify-center">
          {/* image update */}
          <div className="w-full md:w-1/2 lg:w-[60%] order-2 md:order-1 md:-ml-16 lg:-ml-32 mt-8 md:mt-0">
            <Image
              src={googleIc}
              alt="Google"
              width={900}
              height={14}
              className="w-full h-auto object-contain max-h-[50vh] md:max-h-[60vh]"
            />
          </div>

          {/* input */}
          <div className="w-full md:w-1/2 lg:w-[40%] mt-8 md:mt-0 order-1 md:order-2">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#000]">
              The first truly intelligent Project Management
            </h1>

            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4 sm:-ml-6">
              <div className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-gradient-to-r from-[#607aae] to-white rounded-[30px] shadow-lg">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full sm:flex-1 px-4 py-2 bg-transparent outline-none text-black placeholder:text-gray-700 mb-2 sm:mb-0"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 text-white font-semibold bg-[#8AD1DA] rounded-[30px] hover:bg-indigo-700 transition-colors"
                >
                  Start Now!
                </button>
              </div>
            </form>

            <div className="mt-4 text-center sm:text-left">
              <button
                onClick={handleSignupClick}
                className="px-6 sm:px-8 py-3 sm:py-4 font-bold bg-gray-200 rounded hover:bg-gray-300 transition"
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






// "use client"
// import LandingLayout from '../components/LandingLayout';
// import Image from 'next/image';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import googleIc from '../../public/t.png';

// export default function LandingPage() {
//   const [email, setEmail] = useState('');
//   const router = useRouter();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log('Email submitted:', email);

//     // Check authentication status and redirect accordingly
//     const tokenPresent = false; // Replace with your actual token check logic
//     if (tokenPresent) {
//       router.push('/dashboard');
//     } else {
//       router.push('/login');
//     }
//   };

//   const handleLoginClick = () => {
//     router.push('/login');
//   };

//   const handleSignupClick = () => {
//     router.push('/signup');
//   };

//   return (
//     <LandingLayout>
//       <div className="relative min-h-screen">
//         <div className="fixed inset-0 w-full h-full bg-"></div>

//         {/* Content wrapper */}
//         <div className="relative z-10 min-h-screen flex flex-col">
//           <header className="flex justify-end items-center p-4">
//             <div>
//               <button
//                 onClick={handleLoginClick}
//                 className="px-4 sm:px-8 py-2 sm:py-3 font-bold mr-2 bg-gray-200 rounded hover:bg-gray-300 transition"
//               >
//                 Login
//               </button>
//             </div>
//           </header>

//           <main className="flex flex-col md:flex-row flex-grow px-4 md:px-8 items-center justify-center">
//             {/* image update */}
//             <div className="w-full md:w-1/2 lg:w-[60%] order-2 md:order-1 md:-ml-16 lg:-ml-32 mt-8 md:mt-0">
//               <Image
//                 src={googleIc}
//                 alt="Google"
//                 width={900}
//                 height={14}
//                 className="w-full h-auto object-contain max-h-[50vh] md:max-h-[60vh]"
//               />
//             </div>

//             {/* input */}
//             <div className="w-full md:w-1/2 lg:w-[40%] mt-8 md:mt-0 order-1 md:order-2">
//               <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#000]">
//                 The first truly intelligent Project Management
//               </h1>

//               <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4 sm:-ml-6">
//                 <div className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-gradient-to-r from-[#607aae] to-white rounded-[30px] shadow-lg">
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email Address"
//                     className="w-full sm:flex-1 px-4 py-2 bg-transparent outline-none text-black placeholder:text-gray-700 mb-2 sm:mb-0"
//                     required
//                   />
//                   <button
//                     type="submit"
//                     className="w-full sm:w-auto px-6 py-2 text-white font-semibold bg-[#8AD1DA] rounded-[30px] hover:bg-indigo-700 transition-colors"
//                   >
//                     Start Now!
//                   </button>
//                 </div>
//               </form>

//               <div className="mt-4 text-center sm:text-left">
//                 <button
//                   onClick={handleSignupClick}
//                   className="px-6 sm:px-8 py-3 sm:py-4 font-bold bg-gray-200 rounded hover:bg-gray-300 transition"
//                 >
//                   Sign up
//                 </button>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </LandingLayout>
//   );
// }
