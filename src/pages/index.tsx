import Link from "next/link";
import router from "../lib/router";
import { NextApiRequest, NextApiResponse } from "next";

import { SteamProfile } from "@/lib/passport";
import type { NextSteamAuthApiRequest } from "../lib/router";

export default function Index({ user }: { user: SteamProfile }) {
  console.log(user); // Shows the SteamProfile object in console.

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ textAlign: "center" }}
    >
      {user ? (
        <div>
          <h1 className="text-3xl font-bold ">
            Welcome to lann.market! {user.displayName}
          </h1>
          <div className="flex justify-center items-center">
            <img src={user._json?.avatarfull} alt="" />
          </div>
          <br />
          From logging in, your SteamID is {user.id}.<br />
          <br />
          <Link href={user._json.profileurl}>Jump to steam</Link>
          <br />
          <Link href="/api/auth/logout">Logout</Link>
        </div>
      ) : (
        <div>
          Welcome!
          <br />
          <Link href="/api/auth/login">Login</Link>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextSteamAuthApiRequest;
  res: NextApiResponse;
}) {
  await router.run(req, res);
  return { props: { user: req.user || null } };
}
