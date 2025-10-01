import React from 'react'
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

function Usermenu() {
    const { data: session, status } = useSession();
  return (
    <div className="flex items-center gap-6">
    {status === "loading" ? (
      <p>Loading...</p>
    ) : session ? (
      <>
        <p className="text-lg text-gray-600">Write</p>
      
       
        <Image
          className="rounded-full"
          src={session.user?.image || "favicon.ico"}
          alt="Profile"
          width={40}
          height={40}
        />
        <button
          onClick={() => signOut()}
          className="border border-cyan-300 px-4 py-1 rounded-full"
        >
          Sign Out
        </button>
      </>
    ) : (
      <button onClick={() => signIn("google")}>Sign In</button>
    )}
  </div>
  )
}

export default Usermenu