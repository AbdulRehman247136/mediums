"use client"

import { TabsContent, TabsTrigger } from "@/components/ui/tabs"
import MyPost from "@/lib/myposts"
import { Tabs, TabsList } from "@radix-ui/react-tabs"








function Stats(){

  return (
    
    <div className=" overflow-x-hidden ml-10 ">
    <div className="flex items-center justify-between m-15">
        <div >
            <h1 className="text-4xl">
               Stats
            </h1>
        </div>
        </div>
        <div>
        
    


        <Tabs defaultValue="for-you" className="w-3xl p-4  ml-10 border-b-1 border-gray-300 mb-0">
  <TabsList className="gap-6 flex " >
    <TabsTrigger value="stories">Stories</TabsTrigger>
    <TabsTrigger value="audience">Audience</TabsTrigger>
  
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

export default Stats