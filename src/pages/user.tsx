import React from "react";
import router from "../lib/router";
import { NextApiRequest, NextApiResponse } from "next";

import { SteamProfile } from "@/lib/passport";
import type { NextSteamAuthApiRequest } from "../lib/router";
import Link from "next/link";

export default function test({ user }: { user: SteamProfile }) {
  console.log("user", user);
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
          <ul>
            <li>Your PersonaName is {user._json?.personaname}</li>{" "}
            <li>Your SteamID is {user.id}</li>
            <li>
              Your Community Visibility State is{" "}
              {user._json?.communityvisibilitystate}
            </li>{" "}
            <li>Your Persona State is {user._json?.personastate}</li>{" "}
            <li>Your Persona StateFlags is {user._json?.personastateflags}</li>{" "}
            <li>Your Primary Clan Id is {user._json?.primaryclanid}</li>{" "}
            <li>Your Profile State is {user._json?.profilestate}</li>{" "}
            <li>Your Profile Url is {user._json?.profileurl}</li>{" "}
          </ul>

          <br />
          <Link href={user._json.profileurl}>Jump to steam</Link>
          <br />
          <Link href="/api/auth/logout">Logout</Link>
        </div>
      ) : (
        <div>
          <h1>Please Login!</h1>
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
