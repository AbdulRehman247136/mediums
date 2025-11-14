
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
  import { signIn} from "next-auth/react";
import { MdEmail } from 'react-icons/md';

function Medium() {
  return (
    <div className='flex overflow-y-hidden h-[86vh]'>
        <div className=' ml-22   w-[76.5vh] flex flex-col items-start justify-center pl-10'>
        <h1 className=' text-8xl'>Human</h1>
        <span className=' text-8xl'>Stories&Ideas</span>
        <p className='mt-10 text-lg'>A place to read,write, and deepen your understanding</p>
        <Dialog  >
    <DialogTrigger className='border rounded-4xl px-10 py-2 text-white bg-black mt-10'>Start Reading</DialogTrigger>
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
        <div className='flex  items-center justify-center  w-[100vh]'>
            <img src="/new.webp" alt="writing" className='h-150' />
        </div>
    </div>
  )
}

export default Medium