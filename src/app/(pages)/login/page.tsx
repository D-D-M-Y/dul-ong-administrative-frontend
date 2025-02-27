"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState, ChangeEvent, useTransition } from "react";
import { authenticate } from "@/app/lib/authenticate";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoadingSpinner from "@/app/components/Loading";

type LoginInput = {
  email: string;
  password: string;
};

export default function Page() {
  const [inputs, setInputs] = useState<LoginInput>({ email: "", password: "" });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (!inputs.email || !inputs.password) {
      setError("Please enter both email and password.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const attempt_auth = async () => {
      try {
        setLoading(true);
        await authenticate(formData);
        setLoading(false);
        router.push("/");
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    attempt_auth();
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="overflow-hidden grid grid-cols-2 w-full h-screen">
        <div className="flex flex-col flex-grow pt-20 pl-20 h-screen">
          <p className="font-dmserif text-white text-9xl">Dul&apos;ong</p>
          <h1 className="text-white">Made by Ilonggos, for Ilonggos</h1>
          <p className="text-white">
            A route generating application for the people of Iloilo Province
          </p>
          <Image
            src="/3d-route.png"
            alt="3d Route"
            height={500}
            width={500}
            className="place-self-end"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col flex-grow bg-white rounded-l-3xl justify-center items-center h-screen">
            <h1 className="font-bold font-roboto">Log In</h1>
            <div className="flex flex-col pt-4 space-y-2 w-1/3">
              {error && <p className="text-red-500">{error}</p>}

              <input
                type="text"
                id="email"
                name="email"
                value={inputs.email}
                className="border rounded-lg px-2 py-1 text-textC text-m font-ptsans"
                onChange={handleChange}
                placeholder="Username or Email"
              />
              <input
                type="password"
                id="password"
                name="password"
                value={inputs.password}
                className="border rounded-lg px-2 py-1 text-textC text-m font-ptsans"
                onChange={handleChange}
                placeholder="Password"
              />
              <Link
                href="/login/forgot-password"
                className="font-source-sans-pro italic text-purple font-bold text-xs text-end underline py-2"
              >
                Forgot Password?
              </Link>
              <button
                type="submit"
                className="border p2 w-full bg-indigo-100 rounded-md text-center font-bold font-roboto py-3"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
