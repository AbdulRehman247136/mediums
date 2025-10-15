"use client"

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@/components/menubar'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// ✅ Icons
import { CgMenuGridO } from 'react-icons/cg'
import { FaBell } from 'react-icons/fa'
import { GiJusticeStar } from 'react-icons/gi'

function Uppernav2() {
  const { data: session } = useSession()

  return (
    <div className="flex ">
      {/* ✅ Main content wrapper */}
      <div className="flex-1">
        <nav className="flex items-center justify-between bg-white h-16 px-6 border-b-2 border-gray-100 ">
          
          {/* ✅ Left Section: Logo + Draft Info */}
          <div className="flex items-center gap-8">
            {session ? (
              <>
                <h1 className="text-2xl font-bold cursor-pointer"><Link href="/home"> Medium </Link></h1>
                <p className = "text-gray-700">Draft in {session?.user?.name}</p>
              </>
            ) : (
              <p className="text-lg">error</p>
            )}
          </div>

            <div className='flex items-center justify-center gap-7'>
            
                <button className='bg-green-600 px-3 py-1 rounded-2xl cursor-pointer text-white'>
            Publish
                </button>
                <FaBell className='w-5 h-5'/>
          {/* ✅ Center Section: Menu Icon */}
          
          <Menubar className="bg-white w-7 mt-2 h-0 cursor-pointer">
  <MenubarMenu>
    <MenubarTrigger>
      <CgMenuGridO className="text-2xl cursor-pointer" />
    </MenubarTrigger>

    <MenubarContent className="bg-white w-[15rem]  text-profile text-[14px] ">
      {/* Now ALL items inherit text-profile + text-base-m */}

      <MenubarItem className="gap-3 pl-3 hover:bg-muted/10  hover:text-black">
        Submit to publication
      </MenubarItem>

      <MenubarItem className="gap-3 pl-3 hover:bg-muted/10  hover:text-black">
        Share draft link
      </MenubarItem>

      <MenubarItem className="gap-3 pl-3 hover:bg-muted/10  hover:text-black">
        Share to X <GiJusticeStar className="text-yellow-500" />
      </MenubarItem>

      <MenubarItem className="gap-3 pl-3 hover:bg-muted/10  hover:text-black">
        Manage unlisted setting
      </MenubarItem>

      <MenubarItem className="gap-3 pl-3 hover:bg-muted/10  hover:text-black">
        Change featured image
      </MenubarItem>

      <MenubarItem className="gap-3 pl-3 hover:bg-muted/10  hover:text-black">
        Change display title
      </MenubarItem>

      <MenubarItem className="gap-3 pl-3 hover:bg-muted/10  hover:text-black">
        Change topics 
      </MenubarItem>

      <MenubarItem className="gap-3 pl-3 hover:bg-muted/10  hover:text-black">
        See revision history
      </MenubarItem>

      <MenubarItem className="gap-3 pl-3 hover:bg-muted/10  hover:text-black">
        More Settings
      </MenubarItem>

      <MenubarSeparator className="bg-gray-500" />

      <MenubarItem className="gap-3 pl-3 hover:bg-muted/10  hover:text-black">
        Hints and keyboard shortcuts
      </MenubarItem>

      <MenubarItem className="gap-3 pl-3 hover:bg-muted/10  hover:text-black">
        More help
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>


          {/* ✅ Right Section: User Menu */}
          <Menubar className="w-10 h-10 cursor-pointer">
            <MenubarMenu>
              <MenubarTrigger>
                <Image
                  className="rounded-full"
                  src={session?.user?.image || "/favicon.ico"}
                  alt="Profile"
                  width={40}
                  height={40}
                />
              </MenubarTrigger>

              <MenubarContent className="bg-white w-[15rem] text-gray-500 text-[14px]">
                {/* Profile Item */}
                <MenubarItem className="cursor-pointer text-high">
                  <Image
                    className="rounded-full"
                    src={session?.user?.image || "/favicon.ico"}
                    alt="Profile"
                    width={40}
                    height={40}
                  />
                  <span className="text-high px-2 mt-1.5 hover:bg-muted/10 hover:text-black">
                    {session?.user?.name}
                    <p>{session?.user?.email}</p>
                  </span>
                </MenubarItem>

                {/* Menu Items — all text-high */}
                <MenubarItem className="gap-3 pl-3 text-high hover:bg-muted/10 hover:text-black">
                  Write
                </MenubarItem>
                <MenubarSeparator className="bg-gray-500" />
                <MenubarItem className="gap-3 pl-3 text-high hover:bg-muted/10 hover:text-black">
                  <Link href="/profile">
                  Profile
                  </Link>
                </MenubarItem>

                <MenubarItem className="gap-3 pl-3 text-high hover:bg-muted/10 hover:text-black">
                <Link 
                href="/library"
                className="flex items-center gap-2">
                  Library <GiJusticeStar className="text-yellow-500" />
                  </Link>
                </MenubarItem>
                <MenubarItem className="gap-3 pl-3 text-high hover:bg-muted/10 hover:text-black">
                <Link href="/stories">
                  Stories
                  </Link>
                </MenubarItem>
                <MenubarItem className="gap-3 pl-3 text-high hover:bg-muted/10 hover:text-black">
                <Link href="/stats">
                  Stats
                  </Link>
                </MenubarItem>
                <MenubarSeparator className="bg-gray-500" />
                <MenubarItem className="gap-3 pl-3 text-high hover:bg-muted/10 hover:text-black">
                  Settings
                </MenubarItem>

                <MenubarItem className="gap-3 pl-3 text-high hover:bg-muted/10 hover:text-black">
                  Refine recommendations
                </MenubarItem>
                <MenubarItem className="gap-3 pl-3 text-high hover:bg-muted/10 hover:text-black">
                  Manage publications
                </MenubarItem>
                <MenubarItem className="gap-3 pl-3 text-high hover:bg-muted/10 hover:text-black">
                  Help
                </MenubarItem>
                <MenubarSeparator className="bg-gray-500" />

                <MenubarItem className="gap-3 pl-3 text-high hover:bg-muted/10 hover:text-black">
                  Apply to the Partner Program
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Uppernav2
