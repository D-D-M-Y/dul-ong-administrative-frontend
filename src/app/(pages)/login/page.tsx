"use client";
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation';

import { useState, FormEvent, ChangeEvent, useTransition, startTransition } from 'react';
import { authenticate } from '@/app/lib/authenticate';
import { useRouter, useSearchParams } from 'next/navigation';

type LoginInput = {
  email: string;
  password: string;
}

type PageProps = {
  searchParams: { error?: string }
}

export default function Page({searchParams}: PageProps) {
  const [inputs, setInputs] = useState<LoginInput>({ email: "", password: "" });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
  
    const attempt_auth = async () => {
      try {
        await authenticate(formData);
        router.push('/')
      } catch (err: any) {
        setError(err.message);
      }
    };

    attempt_auth();

  }

  
  return (
      <div className="overflow-hidden grid grid-cols-2 w-full h-screen"> {/* Grid container with two columns */}

        <div className="flex flex-col flex-grow pt-20 pl-20 h-screen">  {/* First column: full width */}
          <img src="/dulong-white.svg" className="w-1/2" />
          <h1 className="text-white">Made by Ilonggos, for Ilonggos</h1>
          <p className="text-white">A route generating application for the people of Iloilo Province</p>
          <img src="/3droute.svg" className="size-9/12 place-self-end" />
        </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col flex-grow bg-white rounded-l-3xl justify-center items-center h-screen">  {/* Second column: full width */}
          <h1 className="font-bold font-roboto">Log In</h1>
          
          <button className="border rounded-lg p-2 hover:highlight flex justify-center w-1/3">
            <FcGoogle size = {18}/> 
            <p className = "relative text-center text-textC pl-2">Continue with Google</p>
          </button>

      <div className="flex flex-col flex-grow bg-white rounded-l-3xl justify-center items-center h-screen">
        <h1 className="font-bold font-roboto">Log In</h1>
        
        {/* <button className="border rounded-lg p-2 hover:highlight flex justify-center w-1/3">
          <FcGoogle size={18} />
          <p className="relative text-center text-textC pl-2">Continue with Google</p>
        </button>
          <div className="flex flex-col pt-4 space-y-2 w-1/3">
            <input type="text" id="email" name="email" value={inputs.email} className="border rounded-lg px-2 py-1 text-textC text-m font-ptsans" onChange={handleChange} placeholder="Username or Email" />
            <input type="password" id="password" name="password" value={inputs.password} className="border rounded-lg px-2 py-1 text-textC text-m font-ptsans" onChange={handleChange} placeholder="Password" />
            <Link href="/login/forgot-password" className="font-source-sans-pro italic text-purple font-bold text-xs text-end underline py-2">Forgot Password?</Link>
            <button type="submit" className="border rounded-lg p2 w-full bg-indigo-100 rounded-3xl text-center font-bold font-roboto py-3">Login</button> 
          </div>
      </div>
      </form>
      </div>
    </div>
  );
}
