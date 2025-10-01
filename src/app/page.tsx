"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from 'next/image'

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="p-6">
      {!session ? (
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      
      ) : (
        <>
          <p>Welcome, {session.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
          <p>{session.user?.email}</p>
         <Image src={session.user?.image|| "favicon.ico"} alt="new image" width={50} height={50}></Image>
        </>
      )}
    </main>
  );
}
