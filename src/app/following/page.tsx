"use client"

import { TabsContent, TabsTrigger } from "@/components/ui/tabs"
import MyPost from "@/lib/myposts"
import { Tabs, TabsList } from "@radix-ui/react-tabs"








function Following(){

  return (
    
    <div className=" overflow-x-hidden m-auto w-[110vh]">
    <div className="flex items-center justify-between m-15">
        <div >
            <h1 className="text-4xl">
               Following
            </h1>
        </div>
    
        </div>
        <div>
        
    


        <Tabs defaultValue="for-you" className="w-full p-4  ml-10 border-b-1 border-gray-300 mb-0">
  <TabsList className="gap-6 flex " >
  <TabsTrigger
  value="writers"
  className="border rounded-4xl px-4 py-2 text-gray-600 hover:text-black 
             no-underline focus:outline-none focus-visible:ring-0 
             data-[state=active]:after:hidden cursor-pointer"
>
  Writers and Publications
</TabsTrigger>

<TabsTrigger
  value="topics"
  className="border rounded-4xl px-4 py-2 text-gray-600 hover:text-black 
             no-underline focus:outline-none focus-visible:ring-0 
             data-[state=active]:after:hidden cursor-pointer hover:border-black"
>
  Topics
</TabsTrigger>

   
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

export default Following