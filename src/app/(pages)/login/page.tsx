'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation';

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('hasVisited', 'true');  // Set this to mark the user's first login
      localStorage.setItem('username', username);
      router.push('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="overflow-hidden grid grid-cols-2 w-full h-screen">
      <div className="flex flex-col flex-grow pt-20 pl-20 h-screen">
        <img src="/dulong-white.svg" className="w-1/2" />
        <h1 className="text-white">Made by Ilonggos, for Ilonggos</h1>
        <p className="text-white">A route generating application for the people of Iloilo Province</p>
        <img src="/3droute.svg" className="size-9/12 place-self-end" />
      </div>

      <div className="flex flex-col flex-grow bg-white rounded-l-3xl justify-center items-center h-screen">
        <h1 className="font-bold font-roboto">Log In</h1>
        
        {/* <button className="border rounded-lg p-2 hover:highlight flex justify-center w-1/3">
          <FcGoogle size={18} />
          <p className="relative text-center text-textC pl-2">Continue with Google</p>
        </button>

        <div className="flex items-center pb-2 mt-4">
          <div className="w-auto p-5 border-b border-lgray py-1"></div>
          <span className="text-lgray font-source-sans-pro px-2">or</span>
          <div className="w-auto p-5 border-b border-lgray py-1"></div>
        </div> */}

        <div className="flex flex-col pt-4 space-y-2 w-1/3">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-lg px-2 py-1 text-textC text-m font-ptsans"
            placeholder="Username or Email"
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-2 py-1 text-textC text-m font-ptsans"
            placeholder="Password"
          />
          <Link href="/login/forgot-password" className="font-source-sans-pro italic text-purple font-bold text-xs text-end underline py-2">
            Forgot Password?
          </Link>
          <button
            className="border rounded-lg p2 w-full bg-indigo-100 rounded-3xl text-center font-bold font-roboto py-3"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
