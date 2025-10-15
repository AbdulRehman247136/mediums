"use client"

import { TabsContent, TabsTrigger } from "@/components/ui/tabs"
import MyPost from "@/lib/myposts"
import { Tabs, TabsList } from "@radix-ui/react-tabs"








function Library(){

  return (
    
    <div className=" overflow-x-hidden m-auto w-[110vh]">
    <div className="flex items-center justify-between m-15">
        <div >
            <h1 className="text-4xl">
               library
            </h1>
        </div>
        <div>
        <button className="border rounded-4xl px-4 py-2 bg-green-600 text-white">
          New list
        </button>
        </div>
        </div>
        <div>
        
    


        <Tabs defaultValue="for-you" className="w-full p-4  ml-10 border-b-1 border-gray-300 mb-0">
  <TabsList className="gap-6 flex " >
    <TabsTrigger value="yourlists">Your lists</TabsTrigger>
    <TabsTrigger value="savedlists">Saved lists </TabsTrigger>
    <TabsTrigger value="highlights">Highlights</TabsTrigger>
    <TabsTrigger value="readinghistory">Reading History</TabsTrigger>
    <TabsTrigger value="responses">Responses</TabsTrigger>
  </TabsList>
  <div className="flex items-center justify-start ">
  <TabsContent value="published">
    <MyPost/>
  
  </TabsContent>
  <TabsContent value="featured"></TabsContent>
  </div>
</Tabs>

        </div>
        </div>
  )
}

export default Library