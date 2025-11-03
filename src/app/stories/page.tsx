"use client"

import { TabsContent, TabsTrigger } from "@/components/ui/tabs"
import MyPost from "@/lib/myposts"
import { Tabs, TabsList } from "@radix-ui/react-tabs"








function Stories(){

  return (
    
    <div className=" overflow-x-hidden">
    <div className="flex items-center justify-between m-15">
        <div >
            <h1 className="text-4xl">
                Stories
            </h1>
        </div>
        <div>
        <button className="border rounded-4xl px-4 py-2 bg-green-600 text-white">
            Import an Story
        </button>
        </div>
        </div>



        <Tabs defaultValue="for-you" className="w-full p-6  ml-10">
  <TabsList className="gap-6 flex " >
    <TabsTrigger value="drafts">Drafts</TabsTrigger>
    <TabsTrigger value="published">Published</TabsTrigger>
    
    <TabsTrigger value="unlisted">Unlisted</TabsTrigger>
    <TabsTrigger value="submissions">Submissions</TabsTrigger>
  </TabsList>
  <div className="flex items-center justify-start ">
  <TabsContent value="published">
    <MyPost/>
  
  </TabsContent>
  <TabsContent value="featured"></TabsContent>
  </div>
</Tabs>

        </div>
  )
}

export default Stories