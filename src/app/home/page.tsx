"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" 
import PostList from "@/lib/posts";
import React from 'react'

function Home() {
  return (
    
    <div className='w-[142vh]'> 
    <Tabs defaultValue="for-you" className="w-full">
  <TabsList className="gap-6 flex border-b border-gray-300 w-full" >
    <TabsTrigger value="for-you">For you</TabsTrigger>
    <TabsTrigger value="featured">Featured</TabsTrigger>
  </TabsList>
  <div className="flex items-center justify-start">
  <TabsContent value="for-you">For You content</TabsContent>
  <TabsContent value="featured">Featured content</TabsContent>
  </div>
</Tabs>
<PostList />

      
    </div>
  )
}

export default Home