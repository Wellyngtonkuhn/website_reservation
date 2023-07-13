"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";

export default function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { data, status } = useSession();

  const handleLogIn = () => signIn();

  const handleLogOut = () => {
    setMenuIsOpen(false);
    signOut();
  };

  const handleOpenMenu = () => setMenuIsOpen(!menuIsOpen);

  return (
    <div className="w-full shadow-md">
      <div className="container mx-auto py-5  h-24 px-5 flex justify-between items-center">
        <div className="relative h-[32px] w-[182px]">
          <Link href="/">
            <Image src="/logo.png" alt="fwsweek logo" fill />
          </Link>
        </div>

        {status === "unauthenticated" && (
          <button className="text-primary text-sm font-semibold" onClick={handleLogIn}>
            Login
          </button>
        )}

        {status === "authenticated" && data.user && (
          <div className="flex items-center gap-3 p-2 px-3 border-grayLighter border border-solid rounded-full">
            <AiOutlineMenu
              size={16}
              onClick={handleOpenMenu}
              className="cursor-pointer"
            />
            <Image
              src={data.user.image!}
              alt={data.user.name!}
              width={35}
              height={35}
              className="rounded-full shadow-md"
            />
            {menuIsOpen && (
              <div className="">
                <button
                  onClick={handleLogOut}
                  className="text-primary font-semibold text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
