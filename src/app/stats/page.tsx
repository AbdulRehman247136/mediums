"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Viewcharts from "@/lib/charts"
import MyPost from "@/lib/myposts"








function Stats() {

  return (

    <div className="overflow-x-hidden p-4 md:p-10">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Stats</h1>
        </div>
      </div>
      <div>




        <Tabs defaultValue="stories" className="w-full max-w-4xl">
          <TabsList className="flex gap-4 md:gap-8 border-b border-gray-200 mb-0 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <TabsTrigger value="stories" className="px-2 md:px-4">Stories</TabsTrigger>
            <TabsTrigger value="published" className="px-2 md:px-4">Published</TabsTrigger>
            <TabsTrigger value="audience" className="px-2 md:px-4">Audience</TabsTrigger>
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