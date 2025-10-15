"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/Dialog";
  import { useSession, signIn, signOut } from "next-auth/react";
import { MdEmail } from 'react-icons/md';



function UpperNav() {
  return (
     

      <nav className="flex items-center justify-between bg-white h-[7vh] px-40 border-b-1 border-black ">
        
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold">Medium</h1>
        </div>
    <div className='flex gap-5 items-center justify-between'>
        <p>Our story</p>
        <p>Membership</p>
        <p>Write</p>

        {/* for the sign in */}
    <Dialog>
    <DialogTrigger>Sign in</DialogTrigger>
    <DialogContent>
      <DialogHeader>
      <div className='flex flex-col gap-3.5 items-center justify-items-start'>
        <DialogTitle className='text-center mb-5 text-3xl'>Join Medium</DialogTitle>
        <DialogDescription>
  <button
    onClick={() => signIn("google")}
    className="flex items-center gap-2 border border-black px-7 py-2 rounded-full cursor-pointer transition-all duration-300 group overflow-hidden"
  >
    <img
      src="/Google-Symbol.png"
      alt="Google Logo"
      className="h-5 justify-items-start"
    />

    {/* Text starts normal, grows slightly on hover */}
    <span className="transform transition-all duration-300 group-hover:scale-110">
      Sign in with Google
    </span>
  </button>
</DialogDescription>

        <DialogDescription className=' flex items-center gap-3.5  border border-black px-7 py-2 rounded-full cursor-pointer transition-all duration-300 group overflow-hidden '>
        <MdEmail className=' text-2xl'/> 
        <span className="transform transition-all duration-300 group-hover:scale-110"> Sign up with Email </span>
            
        </DialogDescription>
        <DialogDescription className='mt-7'>
            No account ? <span className=' underline cursor-pointer ' >Get Started</span>
            </DialogDescription>
        <DialogDescription className='mt-3 text-sm text-black text-center'>
            <p> Forgot email or trouble Signing in? <span className=' underline cursor-pointer ' >Get help</span></p>
            </DialogDescription>
            <DialogDescription className='mt-3 text-sm text-black text-center'>
                <p>Click "Sign In" to agree to Medium's <span className=' underline cursor-pointer ' >Terms of Service</span> and acknowledge that Medium's <span className=' underline cursor-pointer ' >Privacy Policy</span> applies to you.</p>
                </DialogDescription>

        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  


  {/* For the signup */}
  <Dialog >
    <DialogTrigger className='border rounded-4xl px-3 py-2 text-white bg-black'>Get Started</DialogTrigger>
    <DialogContent>
      <DialogHeader>
      <div className='flex flex-col gap-3.5 items-center justify-items-start'>
        <DialogTitle className='text-center mb-5 text-3xl'>Join Medium</DialogTitle>
        <DialogDescription>
  <button
    onClick={() => signIn("google")}
    className="flex items-center gap-2 border border-black px-7 py-2 rounded-full cursor-pointer transition-all duration-300 group overflow-hidden"
  >
    <img
      src="/Google-Symbol.png"
      alt="Google Logo"
      className="h-5 justify-items-start"
    />

    {/* Text starts normal, grows slightly on hover */}
    <span className="transform transition-all duration-300 group-hover:scale-110">
      Sign Up with Google
    </span>
  </button>
</DialogDescription>

        <DialogDescription className=' flex items-center gap-3.5  border border-black px-7 py-2 rounded-full cursor-pointer transition-all duration-300 group overflow-hidden '>
        <MdEmail className=' text-2xl'/> 
        <span className="transform transition-all duration-300 group-hover:scale-110"> Sign up with Email </span>
            
        </DialogDescription>
        <DialogDescription className='mt-7'>
            Already have an account? <span className=' underline cursor-pointer ' >Sign In</span>
        </DialogDescription>
        <DialogDescription className='mt-3 text-sm text-black text-center'>
        <p>

  Click &quot;Get Started&quot; to agree to Medium's{" "}
  <span className="underline cursor-pointer">Terms of Service</span> and
  acknowledge that Medium's{" "}
  <span className="underline cursor-pointer">Privacy Policy</span> applies to
  you.
</p>
</DialogDescription>


        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>
 
  </div>
  </nav>
 

  )
}

export default UpperNav