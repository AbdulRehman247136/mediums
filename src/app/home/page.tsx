"use client";
import RightSideBar from "@/components/layout/rightsidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" 
import PostList from "@/lib/posts";
import React from 'react'

function Home() {
  return (
    
    <div className='flex items-start  '> 
    <Tabs defaultValue="for-you" className="w-full p-6">
  <TabsList className="gap-6 flex border-b border-gray-300 w-full" >
    <TabsTrigger value="for-you">For you</TabsTrigger>
    <TabsTrigger value="featured">Featured</TabsTrigger>
  </TabsList>
  <div className="flex items-center justify-start ">
  <TabsContent value="for-you">For You content

  <PostList />
  </TabsContent>
  <TabsContent value="featured">Featured content</TabsContent>
  </div>
</Tabs>
<div className="flex">
<RightSideBar />
</div>

      
    </div>
  )
}

export default Home