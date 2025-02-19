"use client";
import { useState } from "react";
import { Loader } from "../components/Loading";

export default function GenerateRouteButton(){
  const [loading, setLoading] = useState(false)
  const [showError, setError] = useState();
  const generateRoute = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/generate`);
      if (!response.ok) {
        throw new Error("Error in generating route");
      }
    };
  if (loading == false){
    return (
        <button 
            onClick={() => {setLoading(true); try{generateRoute()}catch(err){setError(() => {throw err;})}; setLoading(false)}} 
            className="w-full bg-indigo-100 rounded-lg text-textC font-bold font-roboto py-2">
            <h2>Generate Route</h2>
        </button>
    )
  }
  else {
    return(<Loader/>)
  }
}