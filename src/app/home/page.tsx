"use client";
import FeaturedContent from "@/components/layout/featuredcontent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" 
import PostList from "@/lib/posts";
import React from 'react'

function Home() {
  return (
<div className="flex flex-col md:flex-row w-full">
  {/* 📰 Main content */}
  <div className="flex-1 md:flex-[3] p-4 ">
    <Tabs defaultValue="for-you" className="w-full">
      <TabsList className=" w-full mt-5 gap-5 flex">
        <TabsTrigger value="for-you">For You</TabsTrigger>
        <TabsTrigger value="featured">Featured</TabsTrigger>
      </TabsList>

      <div className="">
        <TabsContent value="for-you">
          <h2 className="text-lg font-semibold mb-2">For You Content</h2>
          <PostList />
        </TabsContent>

        <TabsContent value="featured">
          <h2 className="text-lg font-semibold mb-2">Featured Content</h2>
          <FeaturedContent />
        </TabsContent>
      </div>
    </Tabs>
  </div>

  {/* 📎 Sidebar */}
 
</div>

  )
}

export default Home