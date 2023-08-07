import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SteamProfile } from "@/lib/passport";

export default function Header({ user }: { user: SteamProfile }) {
  console.log("11", user);
  const [animateHeader, setAnimateHeader] = useState(false);
  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 140) {
        setAnimateHeader(true);
      } else setAnimateHeader(false);
    };
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);
  // const menuItems = [
  //   user
  //     ? { title: "Log Out", url: "/api/auth/logout" }
  //     : { title: "Log In", url: "/api/auth/login" },
  // ];

  return (
    <header
      className={`w-full backdrop-filter backdrop-blur-lg bg-black/20 fixed z-10 trasition ease-in-out duration-500 ${
        animateHeader && "shadow-xl"
      }`}
    >
      <div className="max-w-9xl mx-auto ">
        <div
          className={`flex max-w-screen-2xl py-4 ${
            animateHeader && "py-5"
          } mx-auto items-center justify-between px-8 trasition ease-in-out duration-500`}
        >
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter text-indigo-400 pr-8"
          >
            <Image
              src="/lann.svg"
              width={100}
              height={100}
              alt="Picture of the author"
            />
          </Link>
          <nav>
            <ul className="flex items-center justify-start">
              {user ? (
                <>
                  <li>
                    <Link
                      href={"/api/auth/logout"}
                      className="px-2 lg:px-6 py-6 text-md border-b-2 border-transparent hover:border-indigo-400 leading-[22px] md:px-3 text-gray-100 hover:text-indigo-500"
                    >
                      Log Out
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/user"}
                      className="px-2 lg:px-6 py-6 text-md border-b-2 border-transparent hover:border-indigo-400 leading-[22px] md:px-3 text-gray-100 hover:text-indigo-500"
                    >
                      User
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href={"/api/auth/login"}
                    className="px-2 lg:px-6 py-6 text-md border-b-2 border-transparent hover:border-indigo-400 leading-[22px] md:px-3 text-gray-100 hover:text-indigo-500"
                  >
                    Log In
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
