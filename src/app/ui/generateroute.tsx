"use client";
import { useState } from "react";
import { Loader } from "../components/Loading";
import generateRoute from "../lib/actions";

export default function GenerateRouteButton(){
  const [loading, setLoading] = useState(false)
  const [showError, setError] = useState();
  

  const handleClick = async () => {
    setLoading(true);
    try {
      await generateRoute();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading == false){
    return (
        <button 
            onClick={handleClick} 
            className="w-full bg-indigo-100 rounded-lg text-textC font-bold font-roboto py-2">
            <h2>Generate Route</h2>
            {showError && <p className="error">{showError}</p>}
        </button>
    )
  }
  else {
    return(<Loader/>)
  }
}