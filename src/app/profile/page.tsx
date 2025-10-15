"use client";
import RightSideBar from "@/components/layout/rightsidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" 
import MyPost from "@/lib/myposts";
import PostList from "@/lib/posts";
import { useSession } from "next-auth/react";
import React from 'react'

function Profile() {
  const { data: session, status } = useSession();
  return (
    <div className=" overflow-x-hidden ml-10 ">
      {session && (
    <div className="flex items-center justify-between m-15">
        <div >
            <h1 className="text-4xl">
            {session.user?.name}
            </h1>
        </div>
        </div>
         )}
    
        <div>
       


        <Tabs defaultValue="for-you" className="w-3xl p-4  ml-10 border-b-1 border-gray-300 mb-0">
  <TabsList className="gap-6 flex " >
    <TabsTrigger value="home" className="cursor-pointer">Home</TabsTrigger>
    <TabsTrigger value="about" className="cursor-pointer">About</TabsTrigger>
  
  </TabsList>
  <div className="flex items-center justify-start ">
  
  </div>
</Tabs>

        </div>
        </div>
  )
}

export default Profile