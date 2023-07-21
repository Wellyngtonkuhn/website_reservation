"use client";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
export default function Login() {
  const session = useSession();
  const route = useRouter();

  if (session.status === "authenticated") route.push("/my-trips");

  const handleLogin = () => signIn();

  return (
    <section className="w-full h-full">
      <div className="h-full container mx-auto px-5 ">
        <div className="h-full flex flex-col items-center justify-center">
          <h3 className="flex items-center text-xl text-center font-semibold text-primaryDarker mb-2">
            <FaGoogle />
            oogle
          </h3>
          <p className="text-sm text-primaryDarker font-medium mb-2 ">
            Faça login para continuar
          </p>
          <button
            className="w-full bg-primary text-white rounded-lg p-2 text-sm font-semibold"
            onClick={() => handleLogin()}
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
}
