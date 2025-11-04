import React from 'react'
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaBell } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { IoHelpCircleOutline } from 'react-icons/io5';
import { GiJusticeStar } from 'react-icons/gi';
import { TfiWrite } from 'react-icons/tfi';
import Link from 'next/link';
import TypingText from '../ui/shadcn-io/typing-text';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '../menubar';

function Usermenu() {
    const { data: session, status } = useSession();
    function maskEmail(email: string): string {
      const [name, domain] = email.split("@"); // split into username + domain
      if (!name) return email;
    
      const firstTwo = name.slice(0, 2);        // first 2 chars
      const masked = "*".repeat(Math.max(name.length - 2, 0)); // replace rest with *
    
      return `${firstTwo}${masked}@${domain}`;
    }
    
  return (
    <div className="flex items-center gap-8">
    {status === "loading" ? (
      <p> <TypingText
      text={["Loading..."]}
      typingSpeed={75}
      pauseDuration={1500}
      showCursor={true}
      cursorCharacter="|"
      className="text-xl font-bold"
      textColors={['black']}
      variableSpeed={{ min: 50, max: 120 }}
    /></p>
    ) : session ? (
      <>
        <p className=" text-gray-600 flex gap-2 cursor-pointer"> <Link href='/write'><TfiWrite className='items-center justify-center mt-1  text-lg' />Write</Link></p>
       
       <FaBell className='w-5 h-5'/>
       <Menubar className='w-10 h-10 cursor-pointer' >
        <MenubarMenu >
        <MenubarTrigger className='cursor-pointer' > 
        <Image
          className="rounded-full"
          src={session.user?.image || "favicon.ico"}
          alt="Profile"
          width={40}
          height={40}
        />
          
        </MenubarTrigger>
        <MenubarContent className='bg-white'>
          <MenubarItem className='cursor-pointer text-profile ' >  <Image
          className="rounded-full"
          src={session.user?.image || "favicon.ico"}
          alt="Profile"
          width={40}
          height={40}
        />
        <span className='text-base px-2 mt-1.5 hover:bg-muted/10 hover:text-black'>{session.user?.name}<p>View profile</p></span>
        
        
            </MenubarItem>
            <MenubarItem className='gap-3 pl-3 text-profile text-base hover:bg-muted/10 hover:text-black'> <CiSettings className='text-high'/> Settings</MenubarItem>
            <MenubarItem className='gap-3 pl-3 text-profile text-base hover:bg-muted/10 hover:text-black'><IoHelpCircleOutline className='text-high'/> Help</MenubarItem>
            <MenubarSeparator className='bg-gray-500' />

          
          <MenubarItem className='gap-3 pl-3 text-profile text-base hover:bg-muted/10  hover:text-black '>Become a Medium member<GiJusticeStar className='text-yellow-500' /></MenubarItem>
          <MenubarItem className='gap-3 pl-3 text-profile text-base hover:bg-muted/10  hover:text-black'>Apply to the Partner Program</MenubarItem>
          <MenubarSeparator className='bg-gray-500' />
          <MenubarItem onClick={() => signOut()} className='gap-3 pl-3  text-base text-profile hover:bg-muted/10  hover:text-black'><span>Sign Out <p className='mt-1'>{session.user?.email ? maskEmail(session.user?.email):""}</p></span></MenubarItem>
        
          <MenubarSeparator className='bg-gray-500' />
          <div className="pl-3 text-[9px] text-profile my-3 flex flex-wrap gap-2 py-0 ">
  <span className='hover:bg-muted/10 hover:text-black'>About</span>
  <span className='hover:bg-muted/10 hover:text-black'>Blog</span>
  <span className='hover:bg-muted/10 hover:text-black'>Careers</span>
  <span className='hover:bg-muted/10 hover:text-black'>Privacy</span>
  <span className='hover:bg-muted/10 hover:text-black'>Terms</span>
  <span className='hover:bg-muted/10 hover:text-black'>Text to Speech</span>
  <span className='hover:bg-muted/10 hover:text-black'>More</span>
</div>

          
         
        </MenubarContent>
        
        </MenubarMenu>
        
        
         </Menubar>
       
        
       
      </>
    ) : (
      <button onClick={() => signIn("google")} className='border border-cyan-300 px-4 py-1 rounded-full cursor-pointer hover:bg-cyan-300 hover:text-white transition'>Sign In</button>
    )}
  </div>
  )
}

export default Usermenu