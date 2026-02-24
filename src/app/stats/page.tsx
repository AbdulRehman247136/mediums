"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Viewcharts from "@/lib/charts"
import MyPost from "@/lib/myposts"








function Stats(){

  return (
    
    <div className="overflow-x-hidden p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Stats</h1>
        </div>
      </div>
        <div>
        
    


      <Tabs defaultValue="stories" className="w-full max-w-4xl">
        <TabsList className="flex gap-8 border-b border-gray-200 mb-0">
          <TabsTrigger value="stories">Stories</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="stories" className="mt-0">
            <Viewcharts />
          </TabsContent>
          
          <TabsContent value="published" className="mt-0">
            <MyPost />
          </TabsContent>
          
          <TabsContent value="audience" className="mt-0">
            <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg border border-dashed">
              Audience insights and demographics will appear here.
            </div>
          </TabsContent>
        </div>
      </Tabs>

        </div>
        </div>
  )
}

export default Stats