"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";

export default function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { data, status } = useSession();
  const route = useRouter();

  const handleLogOut = () => {
    setMenuIsOpen(false);
    signOut();
  };

  const handleOpenMenu = () => setMenuIsOpen(!menuIsOpen);

  const handleCloseMenu = () => {
    setMenuIsOpen(false);
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto py-5  h-24 px-5 flex justify-between items-center">
        <div className="relative h-[32px] w-[182px]">
          <Link href="/">
            <Image src="/logo.png" alt="fwsweek logo" fill />
          </Link>
        </div>

        <div className="flex items-center gap-3 p-2 px-3 border-grayLighter border border-solid rounded-full">
          <AiOutlineMenu size={16} onClick={handleOpenMenu} className="cursor-pointer" />
          {status === "authenticated" && data.user ? (
            <Image
              src={data.user.image!}
              alt={data.user.name!}
              width={35}
              height={35}
              className="rounded-full shadow-md"
            />
          ) : (
            <AiOutlineUser />
          )}
          {menuIsOpen && (
            <div className="flex flex-col items-center gap-y-4 fixed top-20 right-5 bg-white shadow-lg p-2 rounded-xl">
              <Link
                href="/"
                onClick={handleCloseMenu}
                className="text-primary font-semibold text-sm"
              >
                Home
              </Link>
              <Link
                href="/my-trips"
                onClick={handleCloseMenu}
                className="text-primary font-semibold text-sm"
              >
                Minhas viagens
              </Link>
              {status === "authenticated" ? (
                <button
                  onClick={handleLogOut}
                  className="text-primary font-semibold text-sm"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-primary font-semibold text-sm"
                  onClick={handleCloseMenu}
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
